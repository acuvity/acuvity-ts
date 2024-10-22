import { jwtDecode } from 'jwt-decode';
import { ApexInfo, ValidateRequest, AnonymizationEnum, ValidateRequestTypeEnum, ValidateResponse } from './types'; // Import everything from ts
import { base64Encode, base64Decode, makeRequest } from './shims/index'; // Import shims
import { readFile } from 'fs/promises'; // TODO: needs to move to shims

export class RequestRetryError extends Error {
  constructor(message: string = 'Request can be retried') {
    super(message);
    this.name = 'RequestRetryError';
  }
}

export class OutdatedLibraryError extends Error {
  constructor(message: string = 'Your Acuvity library is outdated. Please update to the latest version.') {
    super(message);
    this.name = 'OutdatedLibraryError';
  }
}

export class AcuvityClient {
  private token: string;
  private namespace: string;
  private apiUrl: string;
  private apexUrl: string;
  private useMsgpack: boolean;
  private retryMaxAttempts: number;
  private retryMaxWait: number;
  private availableAnalyzers: Record<string, string[]>;

  constructor({
    token,
    namespace,
    apiUrl,
    apexUrl,
    useMsgpack = false,
    retryMaxAttempts = 10,
    retryMaxWait = 300,
  }: {
    token?: string;
    namespace?: string;
    apiUrl?: string;
    apexUrl?: string;
    useMsgpack?: boolean;
    retryMaxAttempts?: number;
    retryMaxWait?: number;
  }) {
    this.retryMaxAttempts = retryMaxAttempts;
    this.retryMaxWait = retryMaxWait;

    this.availableAnalyzers = {
      PIIs: ['ner_detector', 'pii_detector'],
      Secrets: ['secrets_detector'],
      Topics: ['text_multi_classifier', 'text_classifier_corporate'],
      Exploits: ['prompt_injection', 'harmful_content', 'jailbreak'],
      Languages: ['language_detector', 'gibberish_detector'],
    };

    this.token = token || process.env.ACUVITY_TOKEN || '';
    if (!this.token) {
      throw new Error('No API token provided');
    }

    const decodedToken: any = jwtDecode(this.token);
    if (!decodedToken?.iss || !decodedToken?.source?.namespace) {
      throw new Error('Invalid token provided');
    }

    this.namespace = namespace || process.env.ACUVITY_NAMESPACE || decodedToken.source.namespace;
    this.apiUrl = apiUrl || process.env.ACUVITY_API_URL || decodedToken.iss;
    this.apexUrl = apexUrl || process.env.ACUVITY_APEX_URL || '';
    this.useMsgpack = useMsgpack;
  }

  private buildHeaders(method: string): Record<string, string> {
    const headers: Record<string, string> = {
      Authorization: `Bearer ${this.token}`,
      'X-Namespace': this.namespace,
    };

    if (this.useMsgpack) {
      headers.Accept = 'application/msgpack';
      headers['Content-Type'] = method === 'POST' || method === 'PUT' ? 'application/msgpack' : '';
    } else {
      headers.Accept = 'application/json';
      headers['Content-Type'] = method === 'POST' || method === 'PUT' ? 'application/json; charset=utf-8' : '';
    }

    return headers;
  }

  private retryWrapper(func: Function): Function {
    return async (...args: any[]) => {
      for (let attempt = 1; attempt <= this.retryMaxAttempts; attempt++) {
        try {
          return await func(...args);
        } catch (error) {
          if (attempt === this.retryMaxAttempts || !(error instanceof RequestRetryError)) {
            throw error;
          }
          await new Promise((resolve) => setTimeout(resolve, Math.min(this.retryMaxWait, 2 ** attempt * 1000)));
        }
      }
    };
  }

  private async makeRequest(method: 'GET' | 'POST', url: string, body?: any): Promise<any> {
    const options = {
      method,
      url,
      headers: this.buildHeaders(method),
    };
    return await makeRequest(options, body);
  }

  public async apexRequest(method: 'GET' | 'POST', path: string, body?: any): Promise<any> {
    const url = `${this.apexUrl}${path}`;
    return this.retryWrapper(() => this.makeRequest(method, url, body))();
  }

  public async apiRequest(method: 'GET' | 'POST', path: string, body?: any): Promise<any> {
    const url = `${this.apiUrl}${path}`;
    return this.retryWrapper(() => this.makeRequest(method, url, body))();
  }

  public async apiGet(path: string, objectClass: any): Promise<any> {
    const response = await this.apiRequest('GET', path);
    return this._objFromContent(objectClass, response.body, response.headers['Content-Type']);
  }

  public async apexGet(path: string, objectClass: any): Promise<any> {
    const response = await this.apexRequest('GET', path);
    return this._objFromContent(objectClass, response.body, response.headers['Content-Type']);
  }

  public async wellKnownApexInfo(): Promise<ApexInfo> {
    return this.apiGet('/.well-known/acuvity/my-apex.json', {}); // TODO: doesn't work like this here
  }

  private _objFromContent(objectClass: any, content: string, contentType: string): any {
    let data: any;
    if (contentType && contentType.includes('application/msgpack')) {
      data = JSON.parse(content); // Assuming msgpack to be implemented here
    } else if (contentType && contentType.includes('application/json')) {
      data = JSON.parse(content);
    } else {
      data = JSON.parse(content);
    }

    if (Array.isArray(data)) {
      return data.map((item) => objectClass.fromObject(item));
    } else {
      return objectClass.fromObject(data);
    }
  }

  private _objToContent(obj: any): string {
    if (Array.isArray(obj)) {
      return JSON.stringify(obj.map((item) => item.toJSON()));
    } else {
      return JSON.stringify(obj.toJSON());
    }
  }

  public async validate(
    messages: string[],
    files?: (string | File)[],
    request?: ValidateRequest,
    type: ValidateRequestTypeEnum = ValidateRequestTypeEnum.Input,
    annotations?: Record<string, string>,
    analyzers?: string[],
    bypassHash?: string,
    anonymization?: AnonymizationEnum,
    redactions?: string[],
    keywords?: string[],
    minimalLogging?: boolean,
    contentPolicy?: string
  ): Promise<ValidateResponse> {
    if (!request) {
      request = {
        type,
        messages,
        annotations,
        analyzers,
        redactions,
        keywords,
        anonymization,
        minimalLogging,
        contentPolicy,
        bypassHash,
      };

      // If there are files, we need to handle them (e.g., base64 encode file contents)
      if (files) {
        request.extractions = await Promise.all(
          files.map(async (file) => {
            const fileContent = await this._encodeFile(file);
            return { content: fileContent };
          })
        );
      }
    }

    return this.apexRequest('POST', '/_acuvity/validate/unmanaged', this._objToContent(request));
  }

  public async validateManaged(
    messages: string[],
    files?: (string | File)[],
    request?: ValidateRequest,
    type: ValidateRequestTypeEnum = ValidateRequestTypeEnum.Input,
    annotations?: Record<string, string>
  ): Promise<ValidateResponse> {
    if (!request) {
      request = {
        type,
        messages,
        annotations,
        _managed: true,
      };

      // If there are files, we need to handle them
      if (files) {
        request.extractions = await Promise.all(
          files.map(async (file) => {
            const fileContent = await this._encodeFile(file);
            return { content: fileContent };
          })
        );
      }
    }

    return this.apexRequest('POST', '/_acuvity/validate/managed', this._objToContent(request));
  }

  private async _encodeFile(file: string | File): Promise<string> {
    if (typeof file === 'string') {
      const fileContent = await readFile
      return base64Encode(fileContent);
    } else {
      const reader = new FileReader();
      return new Promise((resolve, reject) => {
        reader.onload = () => resolve(base64Encode(reader.result as string));
        reader.onerror = reject;
        reader.readAsText(file);
      });
    }
  }
}
