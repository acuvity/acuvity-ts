import { Apex } from "./apex.js";
import * as components from "../models/components/index.js";
import { GuardConfig } from "../guard/config.js";
import { ScanResponseMatch } from "../response/match.js";
import { GuardName } from "../guard/constants.js";

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
    }): Promise<ScanResponseMatch>;

    /**
     * _availableAnalyzers keeps a cache of the available analyzers which is lazily initialized based on the first call made to analyzers.
     */
    _availableAnalyzers?: components.Analyzer[];

    /**
     * `listAnalyzers()` returns a list of all available analyzers. This call lists all details about the available analyzers.
     * To get a filtered list of analyzer names or groups that can be used in a scan request, use `list_analyzer_names()` and/or `list_analyzer_groups()`.
     *
     * NOTE: this call is cached for the lifetime of the SDK object.
     */
    listAvailableAnalyzers(): Promise<components.Analyzer[]>;

    /**
     * `listAnalyzerGroups()` returns a list of all available analyzer groups. These can be passed in a scan request
     * to activate/deactivate a whole group of analyzers at once.
     *
     * NOTE: this call is cached for the lifetime of the SDK object.
     */
    listAnalyzerGroups(): Promise<string[]>;

    /**
     * `listAnalyzerNames()` returns a list of all available analyzer names. These can be passed in a scan request
     * to activate/deactivate specific analyzers.
     *
     * @param group the group of analyzers to filter the list by. If not provided, all analyzers will be returned.
     *
     * NOTE: this call is cached for the lifetime of the SDK object.
     */
    listAnalyzerNames(group?: string): Promise<string[]>;

    /**
     * `listAvailableGuards()` returns a list of all available guard names that can be used in the guard config.
     */
    listAvailableGuards(): Promise<string[]>;

    /**
     * listDetectableSecrets: Returns a list of all detectable secrets.
     */
    listDetectableSecrets(): Promise<string[]>;
    /**
     * listDetectablePIIs: Returns a list of all detectable Personally Identifiable Information (PIIs).
     */
    listDetectablePIIs(): Promise<string[]>;
  }
}

// Add the method implementation to the class prototype
Apex.prototype.scan = async function ({
  messages,
  files,
  requestType,
  annotations,
  redactions,
  keywords,
  guardConfig,
}: {
  messages?: string | string[] | undefined,
  files?: string | string[] | undefined,
  requestType?: components.Type | string | undefined,
  annotations?: { [k: string]: string } | undefined,
  redactions?: string[] | undefined,
  keywords?: string[] | undefined,
  guardConfig?: GuardConfig | undefined,
}) {
  const request: components.Scanrequest = {};

  // if guardConfig is given, the keywords and redactions args must not be given.
  if (guardConfig && (keywords || redactions)) {
    throw new Error("Cannot specify keywords or redactions in scan args when using guard config. Please use only one.");
  }

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

  if (guardConfig) {
    keywords = guardConfig.keywords
    redactions = guardConfig.redactionKeys
  }

  request.anonymization = components.Anonymization.FixedSize;

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


  let gconfig: GuardConfig;
  try {
    gconfig = guardConfig ? new GuardConfig(guardConfig) : new GuardConfig();
  } catch (e) {
    throw new Error(`Failed to init config file: ${e}`);
  }

  const rawScanResponse = await this.scanRequest(request);

  // Return a new ScanResponseMatch instance
  return new ScanResponseMatch(rawScanResponse, gconfig, files);
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
    const fileContent = await readFile(filePath);
    return fileContent.toString("base64")
  } else {
    const { readFile } = await import("fs/promises");
    // read file and base64 encode
    const fileContent = await readFile(filePath);
    return fileContent.toString("base64")
  }
}

Apex.prototype.listAvailableAnalyzers = async function (): Promise<components.Analyzer[]> {
  return (this._availableAnalyzers ??= await this.listAnalyzers());
}

Apex.prototype.listAnalyzerNames = async function (group?: string): Promise<string[]> {
  const analyzers = (this._availableAnalyzers ??= await this.listAnalyzers());
  return analyzers
    .filter((a) => !group || a.group === group)
    .map((a) => a.id ?? "")
    .filter((a) => a !== "")
    .sort();
}

Apex.prototype.listAnalyzerGroups = async function (): Promise<string[]> {
  const analyzers = (this._availableAnalyzers ??= await this.listAnalyzers());
  return analyzers
    .map((a) => a.group ?? "")
    .filter((a) => a !== "")
    .filter((v, i, a) => a.indexOf(v) === i)
    .sort();
}

Apex.prototype.listAvailableGuards = async function (): Promise<string[]> {
  return GuardName.values();
}


Apex.prototype.listDetectableSecrets = async function (): Promise<string[]> {
  const detectableSecrets: string[] = [];

  const analyzers = (this._availableAnalyzers ??= await this.listAnalyzers());

  for (const analyzer of analyzers) {
    if (analyzer.detectors) {
      const secrets = analyzer.detectors
        .filter((detector) => detector.group === "Secrets" && detector.name !== undefined)
        .map((detector) => detector.name as string);
      detectableSecrets.push(...secrets);
    }
  }

  return detectableSecrets.sort();
}


Apex.prototype.listDetectablePIIs = async function (): Promise<string[]> {
  const detectablePIIs: string[] = [];

  const analyzers = (this._availableAnalyzers ??= await this.listAnalyzers());


  for (const analyzer of analyzers) {
    if (analyzer.detectors) {
      const piis = analyzer.detectors
        .filter((detector) => detector.group === "PIIs" && detector.name !== undefined)
        .map((detector) => detector.name as string);
      detectablePIIs.push(...piis);
    }
  }

  return detectablePIIs.sort();
}
