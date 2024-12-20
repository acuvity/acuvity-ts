/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import * as z from "zod";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { ClosedEnum } from "../../types/enums.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdkvalidationerror.js";
import {
  Alertevent,
  Alertevent$inboundSchema,
  Alertevent$Outbound,
  Alertevent$outboundSchema,
} from "./alertevent.js";
import {
  Extraction,
  Extraction$inboundSchema,
  Extraction$Outbound,
  Extraction$outboundSchema,
} from "./extraction.js";
import {
  Latency,
  Latency$inboundSchema,
  Latency$Outbound,
  Latency$outboundSchema,
} from "./latency.js";
import {
  Principal,
  Principal$inboundSchema,
  Principal$Outbound,
  Principal$outboundSchema,
} from "./principal.js";

/**
 * Tell what was the decision about the data.
 */
export const Decision = {
  Deny: "Deny",
  Allow: "Allow",
  Ask: "Ask",
  Bypassed: "Bypassed",
  ForbiddenUser: "ForbiddenUser",
} as const;
/**
 * Tell what was the decision about the data.
 */
export type Decision = ClosedEnum<typeof Decision>;

/**
 * The type of text.
 */
export const PoliceresponseType = {
  Input: "Input",
  Output: "Output",
} as const;
/**
 * The type of text.
 */
export type PoliceresponseType = ClosedEnum<typeof PoliceresponseType>;

/**
 * This is a scan and police response.
 */
export type Policeresponse = {
  /**
   * ID is the identifier of the object.
   */
  id?: string | undefined;
  /**
   * List of alerts that got raised during the policy resolution.
   */
  alerts?: Array<Alertevent> | undefined;
  /**
   * Annotations attached to the log.
   */
  annotations?: { [k: string]: string } | undefined;
  /**
   * The client used to send the request.
   */
  client?: string | undefined;
  /**
   * The version of the client used to send the request.
   */
  clientVersion?: string | undefined;
  /**
   * Tell what was the decision about the data.
   */
  decision?: Decision | undefined;
  /**
   * The extractions to log.
   */
  extractions?: Array<Extraction> | undefined;
  /**
   * The hash of the input.
   */
  hash?: string | undefined;
  /**
   * Holds information about latencies introduced by Apex.
   */
  latency?: Latency | undefined;
  /**
   * The namespace of the object.
   */
  namespace?: string | undefined;
  /**
   * The name of the particular pipeline that extracted the text.
   */
  pipelineName?: string | undefined;
  /**
   * Describe the principal.
   */
  principal: Principal;
  /**
   * the provider to use.
   */
  provider?: string | undefined;
  /**
   * The various reasons returned by the policy engine.
   */
  reasons?: Array<string> | undefined;
  /**
   * Set the time of the message request.
   */
  time?: Date | undefined;
  /**
   * The type of text.
   */
  type?: PoliceresponseType | undefined;
};

/** @internal */
export const Decision$inboundSchema: z.ZodNativeEnum<typeof Decision> = z
  .nativeEnum(Decision);

/** @internal */
export const Decision$outboundSchema: z.ZodNativeEnum<typeof Decision> =
  Decision$inboundSchema;

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace Decision$ {
  /** @deprecated use `Decision$inboundSchema` instead. */
  export const inboundSchema = Decision$inboundSchema;
  /** @deprecated use `Decision$outboundSchema` instead. */
  export const outboundSchema = Decision$outboundSchema;
}

/** @internal */
export const PoliceresponseType$inboundSchema: z.ZodNativeEnum<
  typeof PoliceresponseType
> = z.nativeEnum(PoliceresponseType);

/** @internal */
export const PoliceresponseType$outboundSchema: z.ZodNativeEnum<
  typeof PoliceresponseType
> = PoliceresponseType$inboundSchema;

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace PoliceresponseType$ {
  /** @deprecated use `PoliceresponseType$inboundSchema` instead. */
  export const inboundSchema = PoliceresponseType$inboundSchema;
  /** @deprecated use `PoliceresponseType$outboundSchema` instead. */
  export const outboundSchema = PoliceresponseType$outboundSchema;
}

/** @internal */
export const Policeresponse$inboundSchema: z.ZodType<
  Policeresponse,
  z.ZodTypeDef,
  unknown
> = z.object({
  ID: z.string().optional(),
  alerts: z.array(Alertevent$inboundSchema).optional(),
  annotations: z.record(z.string()).optional(),
  client: z.string().optional(),
  clientVersion: z.string().optional(),
  decision: Decision$inboundSchema.optional(),
  extractions: z.array(Extraction$inboundSchema).optional(),
  hash: z.string().optional(),
  latency: Latency$inboundSchema.optional(),
  namespace: z.string().optional(),
  pipelineName: z.string().optional(),
  principal: Principal$inboundSchema,
  provider: z.string().optional(),
  reasons: z.array(z.string()).optional(),
  time: z.string().datetime({ offset: true }).transform(v => new Date(v))
    .optional(),
  type: PoliceresponseType$inboundSchema.optional(),
}).transform((v) => {
  return remap$(v, {
    "ID": "id",
  });
});

/** @internal */
export type Policeresponse$Outbound = {
  ID?: string | undefined;
  alerts?: Array<Alertevent$Outbound> | undefined;
  annotations?: { [k: string]: string } | undefined;
  client?: string | undefined;
  clientVersion?: string | undefined;
  decision?: string | undefined;
  extractions?: Array<Extraction$Outbound> | undefined;
  hash?: string | undefined;
  latency?: Latency$Outbound | undefined;
  namespace?: string | undefined;
  pipelineName?: string | undefined;
  principal: Principal$Outbound;
  provider?: string | undefined;
  reasons?: Array<string> | undefined;
  time?: string | undefined;
  type?: string | undefined;
};

/** @internal */
export const Policeresponse$outboundSchema: z.ZodType<
  Policeresponse$Outbound,
  z.ZodTypeDef,
  Policeresponse
> = z.object({
  id: z.string().optional(),
  alerts: z.array(Alertevent$outboundSchema).optional(),
  annotations: z.record(z.string()).optional(),
  client: z.string().optional(),
  clientVersion: z.string().optional(),
  decision: Decision$outboundSchema.optional(),
  extractions: z.array(Extraction$outboundSchema).optional(),
  hash: z.string().optional(),
  latency: Latency$outboundSchema.optional(),
  namespace: z.string().optional(),
  pipelineName: z.string().optional(),
  principal: Principal$outboundSchema,
  provider: z.string().optional(),
  reasons: z.array(z.string()).optional(),
  time: z.date().transform(v => v.toISOString()).optional(),
  type: PoliceresponseType$outboundSchema.optional(),
}).transform((v) => {
  return remap$(v, {
    id: "ID",
  });
});

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace Policeresponse$ {
  /** @deprecated use `Policeresponse$inboundSchema` instead. */
  export const inboundSchema = Policeresponse$inboundSchema;
  /** @deprecated use `Policeresponse$outboundSchema` instead. */
  export const outboundSchema = Policeresponse$outboundSchema;
  /** @deprecated use `Policeresponse$Outbound` instead. */
  export type Outbound = Policeresponse$Outbound;
}

export function policeresponseToJSON(policeresponse: Policeresponse): string {
  return JSON.stringify(Policeresponse$outboundSchema.parse(policeresponse));
}

export function policeresponseFromJSON(
  jsonString: string,
): SafeParseResult<Policeresponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => Policeresponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'Policeresponse' from JSON`,
  );
}