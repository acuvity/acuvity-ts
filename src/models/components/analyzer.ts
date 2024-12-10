/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import * as z from "zod";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdkvalidationerror.js";
import {
  Analyzermodel,
  Analyzermodel$inboundSchema,
  Analyzermodel$Outbound,
  Analyzermodel$outboundSchema,
} from "./analyzermodel.js";
import {
  Detector,
  Detector$inboundSchema,
  Detector$Outbound,
  Detector$outboundSchema,
} from "./detector.js";

/**
 * Represents an analyzer.
 */
export type Analyzer = {
  /**
   * ID is the identifier of the object.
   */
  id?: string | undefined;
  /**
   * The description of the analyzer.
   */
  description?: string | undefined;
  /**
   * The detectors the analyzer can use.
   */
  detectors?: Array<Detector> | undefined;
  /**
   * Tell if the analyzer is enabled by default.
   */
  enabled?: boolean | undefined;
  /**
   * The group the analyzer belongs to.
   */
  group?: string | undefined;
  /**
   * The models used by the analyzer.
   */
  models?: Array<Analyzermodel> | undefined;
  /**
   * The name of the analyzer.
   */
  name?: string | undefined;
  /**
   * The namespace of the object.
   */
  namespace?: string | undefined;
  /**
   * A list of trigger or globl pattern that the analyzer will react on.
   *
   * @remarks
   * A trigger is the detector Group and Name separated with a /.
   */
  triggers?: Array<string> | undefined;
};

/** @internal */
export const Analyzer$inboundSchema: z.ZodType<
  Analyzer,
  z.ZodTypeDef,
  unknown
> = z.object({
  ID: z.string().optional(),
  description: z.string().optional(),
  detectors: z.array(Detector$inboundSchema).optional(),
  enabled: z.boolean().optional(),
  group: z.string().optional(),
  models: z.array(Analyzermodel$inboundSchema).optional(),
  name: z.string().optional(),
  namespace: z.string().optional(),
  triggers: z.array(z.string()).optional(),
}).transform((v) => {
  return remap$(v, {
    "ID": "id",
  });
});

/** @internal */
export type Analyzer$Outbound = {
  ID?: string | undefined;
  description?: string | undefined;
  detectors?: Array<Detector$Outbound> | undefined;
  enabled?: boolean | undefined;
  group?: string | undefined;
  models?: Array<Analyzermodel$Outbound> | undefined;
  name?: string | undefined;
  namespace?: string | undefined;
  triggers?: Array<string> | undefined;
};

/** @internal */
export const Analyzer$outboundSchema: z.ZodType<
  Analyzer$Outbound,
  z.ZodTypeDef,
  Analyzer
> = z.object({
  id: z.string().optional(),
  description: z.string().optional(),
  detectors: z.array(Detector$outboundSchema).optional(),
  enabled: z.boolean().optional(),
  group: z.string().optional(),
  models: z.array(Analyzermodel$outboundSchema).optional(),
  name: z.string().optional(),
  namespace: z.string().optional(),
  triggers: z.array(z.string()).optional(),
}).transform((v) => {
  return remap$(v, {
    id: "ID",
  });
});

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace Analyzer$ {
  /** @deprecated use `Analyzer$inboundSchema` instead. */
  export const inboundSchema = Analyzer$inboundSchema;
  /** @deprecated use `Analyzer$outboundSchema` instead. */
  export const outboundSchema = Analyzer$outboundSchema;
  /** @deprecated use `Analyzer$Outbound` instead. */
  export type Outbound = Analyzer$Outbound;
}

export function analyzerToJSON(analyzer: Analyzer): string {
  return JSON.stringify(Analyzer$outboundSchema.parse(analyzer));
}

export function analyzerFromJSON(
  jsonString: string,
): SafeParseResult<Analyzer, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => Analyzer$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'Analyzer' from JSON`,
  );
}