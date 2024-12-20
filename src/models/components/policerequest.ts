/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import * as z from "zod";
import { safeParse } from "../../lib/schemas.js";
import { ClosedEnum } from "../../types/enums.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdkvalidationerror.js";
import {
  Extractionrequest,
  Extractionrequest$inboundSchema,
  Extractionrequest$Outbound,
  Extractionrequest$outboundSchema,
} from "./extractionrequest.js";
import {
  Policeexternaluser,
  Policeexternaluser$inboundSchema,
  Policeexternaluser$Outbound,
  Policeexternaluser$outboundSchema,
} from "./policeexternaluser.js";

/**
 * How to anonymize the data. If deanonymize is true, then VariablSize is required.
 */
export const Anonymization = {
  FixedSize: "FixedSize",
  VariableSize: "VariableSize",
} as const;
/**
 * How to anonymize the data. If deanonymize is true, then VariablSize is required.
 */
export type Anonymization = ClosedEnum<typeof Anonymization>;

/**
 * The type of text.
 */
export const Type = {
  Input: "Input",
  Output: "Output",
} as const;
/**
 * The type of text.
 */
export type Type = ClosedEnum<typeof Type>;

/**
 * This is a scan and police request.
 */
export type Policerequest = {
  /**
   * Annotations attached to the extraction.
   */
  annotations?: { [k: string]: string } | undefined;
  /**
   * How to anonymize the data. If deanonymize is true, then VariablSize is required.
   */
  anonymization?: Anonymization | undefined;
  /**
   * In the case of a contentPolicy that asks for a confirmation, this is the
   *
   * @remarks
   * hash you must send back to bypass the block. This is only useful when a
   * content policy has been set or is evaluated remotely.
   */
  bypassHash?: string | undefined;
  /**
   * The extractions to request.
   */
  extractions?: Array<Extractionrequest> | undefined;
  /**
   * Messages to process and provide detections for. Use data in extractions for
   *
   * @remarks
   * processing binary data.
   */
  messages?: Array<string> | undefined;
  /**
   * The name of the provider to use for policy resolutions. If not set, it will
   *
   * @remarks
   * default to the principal name (the application itself).
   */
  provider?: string | undefined;
  /**
   * The type of text.
   */
  type?: Type | undefined;
  /**
   * PoliceExternalUser holds the information about the remote user for a
   *
   * @remarks
   * PoliceRequest.
   */
  user?: Policeexternaluser | undefined;
};

/** @internal */
export const Anonymization$inboundSchema: z.ZodNativeEnum<
  typeof Anonymization
> = z.nativeEnum(Anonymization);

/** @internal */
export const Anonymization$outboundSchema: z.ZodNativeEnum<
  typeof Anonymization
> = Anonymization$inboundSchema;

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace Anonymization$ {
  /** @deprecated use `Anonymization$inboundSchema` instead. */
  export const inboundSchema = Anonymization$inboundSchema;
  /** @deprecated use `Anonymization$outboundSchema` instead. */
  export const outboundSchema = Anonymization$outboundSchema;
}

/** @internal */
export const Type$inboundSchema: z.ZodNativeEnum<typeof Type> = z.nativeEnum(
  Type,
);

/** @internal */
export const Type$outboundSchema: z.ZodNativeEnum<typeof Type> =
  Type$inboundSchema;

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace Type$ {
  /** @deprecated use `Type$inboundSchema` instead. */
  export const inboundSchema = Type$inboundSchema;
  /** @deprecated use `Type$outboundSchema` instead. */
  export const outboundSchema = Type$outboundSchema;
}

/** @internal */
export const Policerequest$inboundSchema: z.ZodType<
  Policerequest,
  z.ZodTypeDef,
  unknown
> = z.object({
  annotations: z.record(z.string()).optional(),
  anonymization: Anonymization$inboundSchema.default("FixedSize"),
  bypassHash: z.string().optional(),
  extractions: z.array(Extractionrequest$inboundSchema).optional(),
  messages: z.array(z.string()).optional(),
  provider: z.string().optional(),
  type: Type$inboundSchema.optional(),
  user: Policeexternaluser$inboundSchema.optional(),
});

/** @internal */
export type Policerequest$Outbound = {
  annotations?: { [k: string]: string } | undefined;
  anonymization: string;
  bypassHash?: string | undefined;
  extractions?: Array<Extractionrequest$Outbound> | undefined;
  messages?: Array<string> | undefined;
  provider?: string | undefined;
  type?: string | undefined;
  user?: Policeexternaluser$Outbound | undefined;
};

/** @internal */
export const Policerequest$outboundSchema: z.ZodType<
  Policerequest$Outbound,
  z.ZodTypeDef,
  Policerequest
> = z.object({
  annotations: z.record(z.string()).optional(),
  anonymization: Anonymization$outboundSchema.default("FixedSize"),
  bypassHash: z.string().optional(),
  extractions: z.array(Extractionrequest$outboundSchema).optional(),
  messages: z.array(z.string()).optional(),
  provider: z.string().optional(),
  type: Type$outboundSchema.optional(),
  user: Policeexternaluser$outboundSchema.optional(),
});

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace Policerequest$ {
  /** @deprecated use `Policerequest$inboundSchema` instead. */
  export const inboundSchema = Policerequest$inboundSchema;
  /** @deprecated use `Policerequest$outboundSchema` instead. */
  export const outboundSchema = Policerequest$outboundSchema;
  /** @deprecated use `Policerequest$Outbound` instead. */
  export type Outbound = Policerequest$Outbound;
}

export function policerequestToJSON(policerequest: Policerequest): string {
  return JSON.stringify(Policerequest$outboundSchema.parse(policerequest));
}

export function policerequestFromJSON(
  jsonString: string,
): SafeParseResult<Policerequest, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => Policerequest$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'Policerequest' from JSON`,
  );
}
