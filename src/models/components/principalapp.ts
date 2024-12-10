/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import * as z from "zod";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdkvalidationerror.js";

/**
 * Describes the principal information of an application.
 */
export type Principalapp = {
  /**
   * The list of labels attached to an application request.
   */
  labels?: Array<string> | undefined;
  /**
   * The name of the application.
   */
  name?: string | undefined;
  /**
   * The tier of the application request.
   */
  tier?: string | undefined;
};

/** @internal */
export const Principalapp$inboundSchema: z.ZodType<
  Principalapp,
  z.ZodTypeDef,
  unknown
> = z.object({
  labels: z.array(z.string()).optional(),
  name: z.string().optional(),
  tier: z.string().optional(),
});

/** @internal */
export type Principalapp$Outbound = {
  labels?: Array<string> | undefined;
  name?: string | undefined;
  tier?: string | undefined;
};

/** @internal */
export const Principalapp$outboundSchema: z.ZodType<
  Principalapp$Outbound,
  z.ZodTypeDef,
  Principalapp
> = z.object({
  labels: z.array(z.string()).optional(),
  name: z.string().optional(),
  tier: z.string().optional(),
});

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace Principalapp$ {
  /** @deprecated use `Principalapp$inboundSchema` instead. */
  export const inboundSchema = Principalapp$inboundSchema;
  /** @deprecated use `Principalapp$outboundSchema` instead. */
  export const outboundSchema = Principalapp$outboundSchema;
  /** @deprecated use `Principalapp$Outbound` instead. */
  export type Outbound = Principalapp$Outbound;
}

export function principalappToJSON(principalapp: Principalapp): string {
  return JSON.stringify(Principalapp$outboundSchema.parse(principalapp));
}

export function principalappFromJSON(
  jsonString: string,
): SafeParseResult<Principalapp, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => Principalapp$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'Principalapp' from JSON`,
  );
}