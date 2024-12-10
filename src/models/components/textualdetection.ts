/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import * as z from "zod";
import { safeParse } from "../../lib/schemas.js";
import { ClosedEnum } from "../../types/enums.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdkvalidationerror.js";

/**
 * The type of detection.
 */
export const TextualdetectionType = {
  Keyword: "Keyword",
  Pii: "PII",
  Secret: "Secret",
} as const;
/**
 * The type of detection.
 */
export type TextualdetectionType = ClosedEnum<typeof TextualdetectionType>;

/**
 * Represents a textual detection done by policy.
 */
export type Textualdetection = {
  /**
   * The end position of the detection.
   */
  end?: number | undefined;
  /**
   * The key that is used in the name's place, If empty, a sequence of X's are used.
   */
  key?: string | undefined;
  /**
   * The name of the detection.
   */
  name?: string | undefined;
  /**
   * The confidence score of the detection.
   */
  score?: number | undefined;
  /**
   * The start position of the detection.
   */
  start?: number | undefined;
  /**
   * The type of detection.
   */
  type?: TextualdetectionType | undefined;
};

/** @internal */
export const TextualdetectionType$inboundSchema: z.ZodNativeEnum<
  typeof TextualdetectionType
> = z.nativeEnum(TextualdetectionType);

/** @internal */
export const TextualdetectionType$outboundSchema: z.ZodNativeEnum<
  typeof TextualdetectionType
> = TextualdetectionType$inboundSchema;

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace TextualdetectionType$ {
  /** @deprecated use `TextualdetectionType$inboundSchema` instead. */
  export const inboundSchema = TextualdetectionType$inboundSchema;
  /** @deprecated use `TextualdetectionType$outboundSchema` instead. */
  export const outboundSchema = TextualdetectionType$outboundSchema;
}

/** @internal */
export const Textualdetection$inboundSchema: z.ZodType<
  Textualdetection,
  z.ZodTypeDef,
  unknown
> = z.object({
  end: z.number().int().optional(),
  key: z.string().optional(),
  name: z.string().optional(),
  score: z.number().optional(),
  start: z.number().int().optional(),
  type: TextualdetectionType$inboundSchema.optional(),
});

/** @internal */
export type Textualdetection$Outbound = {
  end?: number | undefined;
  key?: string | undefined;
  name?: string | undefined;
  score?: number | undefined;
  start?: number | undefined;
  type?: string | undefined;
};

/** @internal */
export const Textualdetection$outboundSchema: z.ZodType<
  Textualdetection$Outbound,
  z.ZodTypeDef,
  Textualdetection
> = z.object({
  end: z.number().int().optional(),
  key: z.string().optional(),
  name: z.string().optional(),
  score: z.number().optional(),
  start: z.number().int().optional(),
  type: TextualdetectionType$outboundSchema.optional(),
});

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace Textualdetection$ {
  /** @deprecated use `Textualdetection$inboundSchema` instead. */
  export const inboundSchema = Textualdetection$inboundSchema;
  /** @deprecated use `Textualdetection$outboundSchema` instead. */
  export const outboundSchema = Textualdetection$outboundSchema;
  /** @deprecated use `Textualdetection$Outbound` instead. */
  export type Outbound = Textualdetection$Outbound;
}

export function textualdetectionToJSON(
  textualdetection: Textualdetection,
): string {
  return JSON.stringify(
    Textualdetection$outboundSchema.parse(textualdetection),
  );
}

export function textualdetectionFromJSON(
  jsonString: string,
): SafeParseResult<Textualdetection, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => Textualdetection$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'Textualdetection' from JSON`,
  );
}
