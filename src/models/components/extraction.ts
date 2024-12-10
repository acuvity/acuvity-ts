/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import * as z from "zod";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdkvalidationerror.js";
import {
  Modality,
  Modality$inboundSchema,
  Modality$Outbound,
  Modality$outboundSchema,
} from "./modality.js";
import {
  Textualdetection,
  Textualdetection$inboundSchema,
  Textualdetection$Outbound,
  Textualdetection$outboundSchema,
} from "./textualdetection.js";

/**
 * The secrets found during classification.
 */
export type Secrets = {};

/**
 * The topic of the classification.
 */
export type Topics = {};

/**
 * Represents the extracted information to log.
 */
export type Extraction = {
  /**
   * The PIIs found during classification.
   */
  piIs?: { [k: string]: number } | undefined;
  /**
   * Annotations attached to the extraction.
   */
  annotations?: { [k: string]: string } | undefined;
  /**
   * The categories are remapping of the modalities in a more human friendly way.
   */
  categories?: Array<Modality> | undefined;
  /**
   * The level of general confidentiality of the input.
   */
  confidentiality?: number | undefined;
  /**
   * The data extracted.
   */
  data?: string | undefined;
  /**
   * The detections found while applying policies.
   */
  detections?: Array<Textualdetection> | undefined;
  /**
   * The various exploits attempts.
   */
  exploits?: { [k: string]: number } | undefined;
  /**
   * The hash of the extraction.
   */
  hash?: string | undefined;
  /**
   * The estimated intent embodied into the text.
   */
  intent?: { [k: string]: number } | undefined;
  /**
   * If true, this extraction is for internal use only. This can be used by agentic
   *
   * @remarks
   * systems to mark an extraction as internal only as opposed to user facing.
   */
  internal?: boolean | undefined;
  /**
   * The keywords found during classification.
   */
  keywords?: { [k: string]: number } | undefined;
  /**
   * A means of distinguishing what was extracted, such as prompt, input file or
   *
   * @remarks
   * code.
   */
  label?: string | undefined;
  /**
   * The language of the classification.
   */
  languages?: { [k: string]: number } | undefined;
  /**
   * The modalities of data detected in the data.
   */
  modalities?: Array<Modality> | undefined;
  /**
   * The redactions that has been performed.
   */
  redactions?: Array<Textualdetection> | undefined;
  /**
   * The level of general organization relevance of the input.
   */
  relevance?: number | undefined;
  /**
   * The secrets found during classification.
   */
  secrets?: Secrets | undefined;
  /**
   * The topic of the classification.
   */
  topics?: Topics | undefined;
};

/** @internal */
export const Secrets$inboundSchema: z.ZodType<Secrets, z.ZodTypeDef, unknown> =
  z.object({});

/** @internal */
export type Secrets$Outbound = {};

/** @internal */
export const Secrets$outboundSchema: z.ZodType<
  Secrets$Outbound,
  z.ZodTypeDef,
  Secrets
> = z.object({});

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace Secrets$ {
  /** @deprecated use `Secrets$inboundSchema` instead. */
  export const inboundSchema = Secrets$inboundSchema;
  /** @deprecated use `Secrets$outboundSchema` instead. */
  export const outboundSchema = Secrets$outboundSchema;
  /** @deprecated use `Secrets$Outbound` instead. */
  export type Outbound = Secrets$Outbound;
}

export function secretsToJSON(secrets: Secrets): string {
  return JSON.stringify(Secrets$outboundSchema.parse(secrets));
}

export function secretsFromJSON(
  jsonString: string,
): SafeParseResult<Secrets, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => Secrets$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'Secrets' from JSON`,
  );
}

/** @internal */
export const Topics$inboundSchema: z.ZodType<Topics, z.ZodTypeDef, unknown> = z
  .object({});

/** @internal */
export type Topics$Outbound = {};

/** @internal */
export const Topics$outboundSchema: z.ZodType<
  Topics$Outbound,
  z.ZodTypeDef,
  Topics
> = z.object({});

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace Topics$ {
  /** @deprecated use `Topics$inboundSchema` instead. */
  export const inboundSchema = Topics$inboundSchema;
  /** @deprecated use `Topics$outboundSchema` instead. */
  export const outboundSchema = Topics$outboundSchema;
  /** @deprecated use `Topics$Outbound` instead. */
  export type Outbound = Topics$Outbound;
}

export function topicsToJSON(topics: Topics): string {
  return JSON.stringify(Topics$outboundSchema.parse(topics));
}

export function topicsFromJSON(
  jsonString: string,
): SafeParseResult<Topics, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => Topics$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'Topics' from JSON`,
  );
}

/** @internal */
export const Extraction$inboundSchema: z.ZodType<
  Extraction,
  z.ZodTypeDef,
  unknown
> = z.object({
  PIIs: z.record(z.number()).optional(),
  annotations: z.record(z.string()).optional(),
  categories: z.array(Modality$inboundSchema).optional(),
  confidentiality: z.number().optional(),
  data: z.string().optional(),
  detections: z.array(Textualdetection$inboundSchema).optional(),
  exploits: z.record(z.number()).optional(),
  hash: z.string().optional(),
  intent: z.record(z.number()).optional(),
  internal: z.boolean().optional(),
  keywords: z.record(z.number()).optional(),
  label: z.string().optional(),
  languages: z.record(z.number()).optional(),
  modalities: z.array(Modality$inboundSchema).optional(),
  redactions: z.array(Textualdetection$inboundSchema).optional(),
  relevance: z.number().optional(),
  secrets: z.lazy(() => Secrets$inboundSchema).optional(),
  topics: z.lazy(() => Topics$inboundSchema).optional(),
}).transform((v) => {
  return remap$(v, {
    "PIIs": "piIs",
  });
});

/** @internal */
export type Extraction$Outbound = {
  PIIs?: { [k: string]: number } | undefined;
  annotations?: { [k: string]: string } | undefined;
  categories?: Array<Modality$Outbound> | undefined;
  confidentiality?: number | undefined;
  data?: string | undefined;
  detections?: Array<Textualdetection$Outbound> | undefined;
  exploits?: { [k: string]: number } | undefined;
  hash?: string | undefined;
  intent?: { [k: string]: number } | undefined;
  internal?: boolean | undefined;
  keywords?: { [k: string]: number } | undefined;
  label?: string | undefined;
  languages?: { [k: string]: number } | undefined;
  modalities?: Array<Modality$Outbound> | undefined;
  redactions?: Array<Textualdetection$Outbound> | undefined;
  relevance?: number | undefined;
  secrets?: Secrets$Outbound | undefined;
  topics?: Topics$Outbound | undefined;
};

/** @internal */
export const Extraction$outboundSchema: z.ZodType<
  Extraction$Outbound,
  z.ZodTypeDef,
  Extraction
> = z.object({
  piIs: z.record(z.number()).optional(),
  annotations: z.record(z.string()).optional(),
  categories: z.array(Modality$outboundSchema).optional(),
  confidentiality: z.number().optional(),
  data: z.string().optional(),
  detections: z.array(Textualdetection$outboundSchema).optional(),
  exploits: z.record(z.number()).optional(),
  hash: z.string().optional(),
  intent: z.record(z.number()).optional(),
  internal: z.boolean().optional(),
  keywords: z.record(z.number()).optional(),
  label: z.string().optional(),
  languages: z.record(z.number()).optional(),
  modalities: z.array(Modality$outboundSchema).optional(),
  redactions: z.array(Textualdetection$outboundSchema).optional(),
  relevance: z.number().optional(),
  secrets: z.lazy(() => Secrets$outboundSchema).optional(),
  topics: z.lazy(() => Topics$outboundSchema).optional(),
}).transform((v) => {
  return remap$(v, {
    piIs: "PIIs",
  });
});

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace Extraction$ {
  /** @deprecated use `Extraction$inboundSchema` instead. */
  export const inboundSchema = Extraction$inboundSchema;
  /** @deprecated use `Extraction$outboundSchema` instead. */
  export const outboundSchema = Extraction$outboundSchema;
  /** @deprecated use `Extraction$Outbound` instead. */
  export type Outbound = Extraction$Outbound;
}

export function extractionToJSON(extraction: Extraction): string {
  return JSON.stringify(Extraction$outboundSchema.parse(extraction));
}

export function extractionFromJSON(
  jsonString: string,
): SafeParseResult<Extraction, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => Extraction$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'Extraction' from JSON`,
  );
}
