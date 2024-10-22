/**
 * ApexInfo holds the well known URL and CA information for an apex for a namespace.
 */
export interface ApexInfo {
  /**
   * The URL of the Apex.
   */
  url: string;
  
  /**
   * The CA certificates that verify the certificates that this apex is serving.
   */
  cas?: string; // Alias: CAs
}

/**
 * PrincipalApp represents the model of a principalapp
 */
export interface PrincipalApp {
  /**
   * The list of labels attached to an application request.
   */
  labels?: string[];
  
  /**
   * The name of the application.
   */
  name?: string;

  /**
   * The tier of the application request.
   */
  tier?: string;
}

/**
 * PrincipalUser represents the model of a principaluser
 */
export interface PrincipalUser {
  /**
   * Identification bit that will be used to identify the origin of the request.
   */
  name: string;
}

/**
 * Principal represents the model of a principal
 */
export interface Principal {
  /**
   * The application principal information if type is App.
   */
  app?: PrincipalApp;
  
  /**
   * The type of authentication.
   */
  authType: string;
  
  /**
   * List of claims extracted from the user query.
   */
  claims?: string[];
  
  /**
   * The team that was used to authorize the request.
   */
  team?: string;
  
  /**
   * The name of the token, if any.
   */
  tokenName: string;
  
  /**
   * The type of principal.
   */
  type: string;
  
  /**
   * The user principal information if type is User.
   */
  user?: PrincipalUser;
}

/**
 * AlertEvent represents the model of a alertevent
 */
export interface AlertEvent {
  /**
   * The name of the alert definition that triggered the alert event.
   */
  alertDefinition: string;
  
  /**
   * The namespace of the alert definition.
   */
  alertDefinitionNamespace: string;
  
  /**
   * The principal of the object.
   */
  principal: Principal;
  
  /**
   * The provider used that the alert came from.
   */
  provider: string;
  
  /**
   * When the alert event was raised.
   */
  timestamp?: Date;
}

/**
 * Modality represents the model of a modality
 */
export interface Modality {
  /**
   * The group of data.
   */
  group: string;
  
  /**
   * The type of data.
   */
  type: string;
}

/**
 * TextualDetection represents the model of a textualdetection
 */
export interface TextualDetection {
  /**
   * The end position of the detection.
   */
  end: number;
  
  /**
   * The key that is used in the name's place, If empty, a sequence of X's are used.
   */
  key: string;
  
  /**
   * The name of the detection.
   */
  name?: string;
  
  /**
   * The confidence score of the detection.
   */
  score: number;
  
  /**
   * The start position of the detection.
   */
  start: number;
  
  /**
   * The type of detection.
   */
  type: string;
}

/**
 * Extraction represents the model of a extraction
 */
export interface Extraction {
  /**
   * The PIIs found during classification.
   */
  PIIs?: Record<string, number>;
  
  /**
   * Annotations attached to the extraction.
   */
  annotations?: Record<string, string>;
  
  /**
   * The categories are remapping of the modalities in a more human friendly way.
   */
  categories?: Modality[];
  
  /**
   * The level of general confidentiality of the input.
   */
  confidentiality?: number;
  
  /**
   * The data extracted.
   */
  data: string;
  
  /**
   * The detections found while applying policies.
   */
  detections?: TextualDetection[];
  
  /**
   * The various exploits attempts.
   */
  exploits?: Record<string, number>;
  
  /**
   * The hash of the extraction.
   */
  hash: string;
  
  /**
   * The estimated intent embodied into the text.
   */
  intent?: Record<string, number>;
  
  /**
   * If true, this extraction is for internal use only.
   */
  internal?: boolean;
  
  /**
   * The keywords found during classification.
   */
  keywords?: Record<string, number>;
  
  /**
   * A means of distinguishing what was extracted, such as prompt, input file or code.
   */
  label?: string;
  
  /**
   * The language of the classification.
   */
  languages?: Record<string, number>;
  
  /**
   * An internal field for lua code. it is ignored by the API.
   */
  luaID?: string;
  
  /**
   * The modalities of data detected in the data.
   */
  modalities?: Modality[];
  
  /**
   * The redactions that has been performed.
   */
  redactions?: TextualDetection[];
  
  /**
   * The level of general organization relevance of the input.
   */
  relevance?: number;
  
  /**
   * The secrets found during classification.
   */
  secrets?: Record<string, number>;
  
  /**
   * The topic of the classification.
   */
  topics?: Record<string, number>;
}

/**
 * Latency represents the model of a latency
 */
export interface Latency {
  /**
   * How much time it took to run the access policy in nanoseconds.
   */
  accessPolicy: number;
  
  /**
   * How much time it took to run content analysis in nanoseconds.
   */
  analysis: number;
  
  /**
   * How much time it took to run the assign policy in nanoseconds.
   */
  assignPolicy: number;
  
  /**
   * How much time it took to run content policy in nanoseconds.
   */
  contentPolicy: number;
  
  /**
   * How much time it took to run input or output extraction in nanoseconds.
   */
  extraction: number;
}

/**
 * ValidateResponse represents the model of a response to a validate API call
 */
export interface ValidateResponse {
  /**
   * The identifier of the object.
   */
  ID?: string;
  
  /**
   * List of alerts that got raised during the policy resolution.
   */
  alerts?: AlertEvent[];
  
  /**
   * Annotations attached to the log.
   */
  annotations?: Record<string, string>;
  
  /**
   * Tell what was the decision about the data.
   */
  decision: string;
  
  /**
   * The extractions to log.
   */
  extractions: Extraction[];
  
  /**
   * The hash of the input.
   */
  hash: string;
  
  /**
   * The hash of the structure used to compare with new import version.
   */
  importHash?: string;
  
  /**
   * The user-defined import label that allows the system to group resources from the same import operation.
   */
  importLabel?: string;
  
  /**
   * Information about latency of various stage of request and response.
   */
  latency: Latency;
  
  /**
   * The namespace of the object.
   */
  namespace?: string;
  
  /**
   * The name of the particular pipeline that extracted the text.
   */
  pipelineName: string;
  
  /**
   * The principal of the object.
   */
  principal: Principal;
  
  /**
   * The provider to use.
   */
  provider: string;
  
  /**
   * The various reasons returned by the policy engine.
   */
  reasons?: string[];
  
  /**
   * Set the time of the message request.
   */
  time: Date;
  
  /**
   * The type of text.
   */
  type: string;
}

/**
 * ExtractionRequest contains the data of an extraction request.
 */
export interface ExtractionRequest {
  /**
   * Annotations attached to the extraction.
   */
  annotations?: Record<string, string>;
  
  /**
   * The data extracted.
   */
  content: string;
  
  /**
   * A means of distinguishing what was extracted, such as prompt, input file or code.
   */
  label?: string;
}

/**
 * AnonymizationEnum represents all the valid values for the anonymization field in a ValidateRequest.
 */
export enum AnonymizationEnum {
  FixedSize = "FixedSize",
  VariableSize = "VariableSize"
}

/**
 * ValidateRequestTypeEnum represents all the valid values for the type field in a ValidateRequest.
 */
export enum ValidateRequestTypeEnum {
  Input = "Input",
  Output = "Output"
}

/**
 * ValidateRequest represents the model of a request to the validate API.
 */
export interface ValidateRequest {
  _managed?: boolean;

  /**
   * Annotations attached to the log.
   */
  annotations?: Record<string, string>;
  
  /**
   * Anonymization values to use. This can be FixedSize or VariableSize.
   */
  anonymization?: AnonymizationEnum;
  
  /**
   * The extractions to process for this request.
   */
  extractions?: ExtractionRequest[];
  
  /**
   * Messages to process and provide detections for.
   */
  messages?: string[];
  
  /**
   * The type of validation request this is. This can be Input or Output.
   */
  type: ValidateRequestTypeEnum;
  
  /**
   * These are the analyzers that you want to use.
   */
  analyzers?: string[];
  
  /**
   * The keywords to try to detect for in the request data.
   */
  keywords?: string[];
  
  /**
   * The redactions to use.
   */
  redactions?: string[];
  
  /**
   * If true, only minimal logging will be done.
   */
  minimalLogging?: boolean;
  
  /**
   * ContentPolicy allows to pass optional Rego content policy.
   */
  contentPolicy?: string;
  
  /**
   * The hash to bypass a block based on contentPolicy.
   */
  bypassHash?: string;
}
