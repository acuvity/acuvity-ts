import { Apex } from "./apex.js";
import * as components from "../models/components/index.js";

// Extend the BaseClass type using declaration merging
declare module "./apex.js" {
  interface Apex {
    /**
     * `scan()` runs the provided messages (prompts) through the Acuvity detection engines and returns the results. Alternatively, you can run model output through the detection engines.
     * Returns a Scanresponse object on success, and raises different exceptions on failure.
     *
     * This function allows to use and try different analyzers and make use of the redaction feature.
     *
     * @param req the request object for a simple scan
     */
    scan(req: {
      /**
       *  the messages to scan. These are the prompts that you want to scan. Required if no files are provided.
       */
      messages?: string | string[] | undefined,

      /**
       * the files to scan. These are the files that you want to scan. Required if no messages are provided. Can be used in addition to messages.
       */
      files?: string | string[] | undefined,

      /**
       * the type of the validation. This can be either Type.INPUT or Type.OUTPUT. Defaults to Type.INPUT. Use Type.OUTPUT if you want to run model output through the detection engines.
       */
      requestType?: components.Type | string | undefined,

      /**
       * the annotations to use. These are the annotations that you want to use. If not provided, no annotations will be used.
       */
      annotations?: { [k: string]: string } | undefined,

      /**
       * the analyzers to use. These are the analyzers that you want to use. If not provided, the internal default analyzers will be used. Use "+" to include an analyzer and "-" to exclude an analyzer. For example, ["+image-classifier", "-modality-detector"] will include the image classifier and exclude the modality detector. If any analyzer does not start with a '+' or '-', then the default analyzers will be replaced by whatever is provided. Call `list_analyzers()` and/or its variants to get a list of available analyzers.
       */
      analyzers?: string[] | undefined,

      /**
       * the bypass hash to use. This is the hash that you want to use to bypass the detection engines. If not provided, no bypass hash will be used.
       */
      bypassHash?: string | undefined,

      /**
       * the anonymization to use. This is the anonymization that you want to use. If not provided, but the returned detections contain redactions, then the system will use the internal defaults for anonymization which is subject to change.
       */
      anonymization?: components.Anonymization | string | undefined,

      /**
       * the redactions to apply. If your want to redact certain parts of the returned detections, you can provide a list of redactions that you want to apply. If not provided, no redactions will be applied.
       */
      redactions?: string[] | undefined,

      /**
       * the keywords to detect in the input. If you want to detect certain keywords in the input, you can provide a list of keywords that you want to detect. If not provided, no keyword detection will be run.
       */
      keywords?: string[] | undefined,

      /**
       * the access policy to run. This is the rego access policy that you can run. If not provided, no access policy will be applied.
       */
      accessPolicy?: string | undefined,

      /**
       * the content policy to run. This is the rego content policy that you can run. If not provided, no content policy will be applied.
       */
      contentPolicy?: string | undefined
    }): Promise<components.Scanresponse>;

    /**
     * `police()` runs the provided messages (prompts) through the Acuvity detection engines, applies policies, and returns the results. Alternatively, you can run model output through the detection engines.
     * Returns a Policeresponse object on success, and raises different exceptions on failure.
     *
     * This function does **NOT** allow to use different analyzers or redactions as policies are being **managed** by the Acuvity backend.
     * To configure different analyzers and redactions you must do so in the Acuvity backend.
     *
     * @param req the request object for a scan and police operation
     */
    police(req: {
      /**
       * the messages to scan. These are the prompts that you want to scan. Required if no files or a direct request object are provided.
       */
      messages?: string | string[] | undefined,

      /**
       * the files to scan. These are the files that you want to scan. Required if no messages are provided. Can be used in addition to messages.
       */
      files?: string | string[] | undefined,

      /**
       * the type of the validation. This can be either Type.INPUT or Type.OUTPUT. Defaults to Type.INPUT. Use Type.OUTPUT if you want to run model output through the detection engines.
       */
      requestType?: components.Type | string | undefined,

      /**
       * the annotations to use. These are the annotations that you want to use. If not provided, no annotations will be used.
       */
      annotations?: { [k: string]: string } | undefined,

      /**
       * the bypass hash to use. This is the hash that you want to use to bypass the detection engines. If not provided, no bypass hash will be used.
       */
      bypassHash?: string | undefined,

      /**
       * the anonymization to use. This is the anonymization that you want to use. If not provided, but the returned detections contain redactions, then the system will use the internal defaults for anonymization which is subject to change.
       */
      anonymization?: components.Anonymization | string | undefined,

      /**
       * the provider to use. This is the provider name that you want to use for policy resolutions. If not provided, it will default to the principal name (the application itself).
       */
      provider?: string | undefined,

      /**
       * the user to use. This is the user name and their claims that you want to use. Required.
       */
      user?: components.Policeexternaluser | undefined,
    }): Promise<components.Policeresponse>;

    /**
     * _available_analyzers keeps a cache of the available analyzers which is lazily initialized based on the first call made to analyzers.
     */
    _available_analyzers?: components.Analyzer[];

    /**
     * `list_analyzers()` returns a list of all available analyzers. This call lists all details about the available analyzers.
     * To get a filtered list of analyzer names or groups that can be used in a scan request, use `list_analyzer_names()` and/or `list_analyzer_groups()`.
     *
     * NOTE: this call is cached for the lifetime of the SDK object.
     */
    listAnalyzers(): Promise<components.Analyzer[]>;

    /**
     * `list_analyzer_groups()` returns a list of all available analyzer groups. These can be passed in a scan request
     * to activate/deactivate a whole group of analyzers at once.
     *
     * NOTE: this call is cached for the lifetime of the SDK object.
     */
    listAnalyzerGroups(): Promise<string[]>;

    /**
     * `list_analyzer_names()` returns a list of all available analyzer names. These can be passed in a scan request
     * to activate/deactivate specific analyzers.
     *
     * @param group the group of analyzers to filter the list by. If not provided, all analyzers will be returned.
     *
     * NOTE: this call is cached for the lifetime of the SDK object.
     */
    listAnalyzerNames(group?: string): Promise<string[]>;
  }
}

// Add the method implementation to the class prototype
Apex.prototype.scan = async function ({
  messages,
  files,
  requestType,
  annotations,
  analyzers,
  bypassHash,
  anonymization,
  redactions,
  keywords,
  accessPolicy,
  contentPolicy,
}: {
  messages?: string | string[] | undefined,
  files?: string | string[] | undefined,
  requestType?: components.Type | string | undefined,
  annotations?: { [k: string]: string } | undefined,
  analyzers?: string[] | undefined,
  bypassHash?: string | undefined,
  anonymization?: components.Anonymization | string | undefined,
  redactions?: string[] | undefined,
  keywords?: string[] | undefined,
  accessPolicy?: string | undefined,
  contentPolicy?: string | undefined
}) {
  const request: components.Scanrequest = {};

  if (messages) {
    if (typeof messages === "string") {
      request.messages = [messages];
    } else if (Array.isArray(messages) && messages.every((m) => typeof m === "string")) {
      request.messages = messages;
    }
  }

  if ((!request.messages || request.messages.length === 0) && !files) {
    throw new Error("no messages and no files provided");
  }

  if (files) {
    let processFiles: string[] = [];
    if (typeof files === "string") {
      processFiles = [files];
    } else if (Array.isArray(files) && files.every((f) => typeof f === "string")) {
      processFiles = files;
    }

    const extractions: components.Extractionrequest[] = [];
    for (const processFile of processFiles) {
      const fileContent = await readFileAndBase64Encode(processFile);
      extractions.push({
        data: fileContent,
      });
    }
    request.extractions = extractions;
  }

  request.type = components.Type.Input;
  if (requestType) {
    if (typeof requestType === "string") {
      if (requestType === "Input" || requestType === "Output") {
        request.type = requestType;
      }
    } else if (typeof requestType === "object") {
      request.type = requestType;
    }
  }

  if (annotations) {
    if (typeof annotations === "object") {
      request.annotations = annotations;
    }
  }

  if (analyzers) {
    if (Array.isArray(analyzers)) {
      const analyzers_list: string[] = (await this.listAnalyzerGroups()).concat(await this.listAnalyzerNames());
      for (let analyzer of analyzers) {
        if (typeof analyzer !== "string") {
          throw new Error("analyzers must be strings");
        }
        if (analyzer.startsWith("+") || analyzer.startsWith("-")) {
          analyzer = analyzer.slice(1);
        }
        if (!analyzers_list.includes(analyzer)) {
          throw new Error(`analyzer '${analyzer}' is not in list of analyzer groups or analyzers: ${analyzers_list}`);
        }
      }
      request.analyzers = analyzers;
    }
  }

  if (bypassHash) {
    if (typeof bypassHash === "string") {
      request.bypassHash = bypassHash;
    }
  }

  request.anonymization = components.Anonymization.FixedSize;
  if (anonymization) {
    if (typeof anonymization === "string") {
      if (anonymization === "FixedSize" || anonymization === "VariableSize") {
        request.anonymization = anonymization;
      }
    } else if (typeof anonymization === "object") {
      request.anonymization = anonymization;
    }
  }

  if (redactions) {
    if (Array.isArray(redactions) && redactions.every((r) => typeof r === "string")) {
      request.redactions = redactions;
    }
  }

  if (keywords) {
    if (Array.isArray(keywords) && keywords.every((k) => typeof k === "string")) {
      request.keywords = keywords;
    }
  }

  if (accessPolicy) {
    if (typeof accessPolicy === "string") {
      request.accessPolicy = accessPolicy;
    }
  }

  if (contentPolicy) {
    if (typeof contentPolicy === "string") {
      request.contentPolicy = contentPolicy;
    }
  }

  return this.scanRequest(request);
};

Apex.prototype.police = async function ({
  messages,
  files,
  requestType,
  annotations,
  bypassHash,
  anonymization,
  provider,
  user,
}: {
  messages?: string | string[] | undefined,
  files?: string | string[] | undefined,
  requestType?: components.Type | string | undefined,
  annotations?: { [k: string]: string } | undefined,
  bypassHash?: string | undefined,
  anonymization?: components.Anonymization | string | undefined,
  provider?: string | undefined,
  user?: components.Policeexternaluser | undefined,
}) {
  const request: components.Policerequest = {};

  if (messages) {
    if (typeof messages === "string") {
      request.messages = [messages];
    } else if (Array.isArray(messages) && messages.every((m) => typeof m === "string")) {
      request.messages = messages;
    }
  }

  if ((!request.messages || request.messages.length === 0) && !files) {
    throw new Error("no messages and no files provided");
  }

  if (files) {
    let processFiles: string[] = [];
    if (typeof files === "string") {
      processFiles = [files];
    } else if (Array.isArray(files) && files.every((f) => typeof f === "string")) {
      processFiles = files;
    }

    const extractions: components.Extractionrequest[] = [];
    for (const processFile of processFiles) {
      const fileContent = await readFileAndBase64Encode(processFile);
      extractions.push({
        data: fileContent,
      });
    }
    request.extractions = extractions;
  }

  request.type = components.Type.Input;
  if (requestType) {
    if (typeof requestType === "string") {
      if (requestType === "Input" || requestType === "Output") {
        request.type = requestType;
      }
    } else if (typeof requestType === "object") {
      request.type = requestType;
    }
  }

  if (annotations) {
    if (typeof annotations === "object") {
      request.annotations = annotations;
    }
  }

  if (bypassHash) {
    if (typeof bypassHash === "string") {
      request.bypassHash = bypassHash;
    }
  }

  request.anonymization = components.Anonymization.FixedSize;
  if (anonymization) {
    if (typeof anonymization === "string") {
      if (anonymization === "FixedSize" || anonymization === "VariableSize") {
        request.anonymization = anonymization;
      }
    } else if (typeof anonymization === "object") {
      request.anonymization = anonymization;
    }
  }

  if (provider) {
    if (typeof provider === "string") {
      request.provider = provider;
    }
  }

  if (user) {
    if (typeof user === "object") {
      request.user = user;
    }
  }

  return this.policeRequest(request)
};

async function readFileAndBase64Encode(filePath: string): Promise<string> {
  const isBrowser: boolean = typeof window !== "undefined" && typeof window.document !== "undefined"
  if (isBrowser) {
    // Running in a browser
    throw new Error("File reading is not supported in the browser.");
  }

  // Dynamically import `fs/promises` for server runtimes
  if (typeof Deno !== "undefined") {
    const { readFile } = await import("node:fs/promises");
    // read file and base64 encode
    const fileContent =  await readFile(filePath);
    return fileContent.toString("base64")
  } else {
    const { readFile } = await import("fs/promises");
    // read file and base64 encode
    const fileContent =  await readFile(filePath);
    return fileContent.toString("base64")
  }
}

Apex.prototype.listAnalyzers = async function (): Promise<components.Analyzer[]> {
  return (this._available_analyzers ??= await this.listAnalyzers());
}

Apex.prototype.listAnalyzerNames = async function (group?: string): Promise<string[]> {
  const analyzers = (this._available_analyzers ??= await this.listAnalyzers());
  return analyzers
    .filter((a) => !group || a.group === group)
    .map((a) => a.id ?? "")
    .filter((a) => a !== "")
    .sort();
}

Apex.prototype.listAnalyzerGroups = async function (): Promise<string[]> {
  const analyzers = (this._available_analyzers ??= await this.listAnalyzers());
  return analyzers
    .map((a) => a.group ?? "")
    .filter((a) => a !== "")
    .filter((v, i, a) => a.indexOf(v) === i)
    .sort();
}
