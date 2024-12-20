/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import * as z from "zod";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "./sdkvalidationerror.js";

/**
 * Additional error data
 */
export type Data = {};

export type ElementalerrorData = {
  /**
   * Error code
   */
  code?: number | undefined;
  /**
   * Additional error data
   */
  data?: Data | undefined;
  /**
   * Error description
   */
  description?: string | undefined;
  /**
   * Error subject
   */
  subject?: string | undefined;
  /**
   * Error title
   */
  title?: string | undefined;
  /**
   * Error trace
   */
  trace?: string | undefined;
};

export class Elementalerror extends Error {
  /**
   * Error code
   */
  code?: number | undefined;
  /**
   * Additional error data
   */
  data?: Data | undefined;
  /**
   * Error description
   */
  description?: string | undefined;
  /**
   * Error subject
   */
  subject?: string | undefined;
  /**
   * Error title
   */
  title?: string | undefined;
  /**
   * Error trace
   */
  trace?: string | undefined;

  /** The original data that was passed to this error instance. */
  data$: ElementalerrorData;

  constructor(err: ElementalerrorData) {
    const message = "message" in err && typeof err.message === "string"
      ? err.message
      : `API error occurred: ${JSON.stringify(err)}`;
    super(message);
    this.data$ = err;

    if (err.code != null) this.code = err.code;
    if (err.data != null) this.data = err.data;
    if (err.description != null) this.description = err.description;
    if (err.subject != null) this.subject = err.subject;
    if (err.title != null) this.title = err.title;
    if (err.trace != null) this.trace = err.trace;

    this.name = "Elementalerror";
  }
}

/** @internal */
export const Data$inboundSchema: z.ZodType<Data, z.ZodTypeDef, unknown> = z
  .object({});

/** @internal */
export type Data$Outbound = {};

/** @internal */
export const Data$outboundSchema: z.ZodType<Data$Outbound, z.ZodTypeDef, Data> =
  z.object({});

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace Data$ {
  /** @deprecated use `Data$inboundSchema` instead. */
  export const inboundSchema = Data$inboundSchema;
  /** @deprecated use `Data$outboundSchema` instead. */
  export const outboundSchema = Data$outboundSchema;
  /** @deprecated use `Data$Outbound` instead. */
  export type Outbound = Data$Outbound;
}

export function dataToJSON(data: Data): string {
  return JSON.stringify(Data$outboundSchema.parse(data));
}

export function dataFromJSON(
  jsonString: string,
): SafeParseResult<Data, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => Data$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'Data' from JSON`,
  );
}

/** @internal */
export const Elementalerror$inboundSchema: z.ZodType<
  Elementalerror,
  z.ZodTypeDef,
  unknown
> = z.object({
  code: z.number().int().optional(),
  data: z.lazy(() => Data$inboundSchema).optional(),
  description: z.string().optional(),
  subject: z.string().optional(),
  title: z.string().optional(),
  trace: z.string().optional(),
})
  .transform((v) => {
    return new Elementalerror(v);
  });

/** @internal */
export type Elementalerror$Outbound = {
  code?: number | undefined;
  data?: Data$Outbound | undefined;
  description?: string | undefined;
  subject?: string | undefined;
  title?: string | undefined;
  trace?: string | undefined;
};

/** @internal */
export const Elementalerror$outboundSchema: z.ZodType<
  Elementalerror$Outbound,
  z.ZodTypeDef,
  Elementalerror
> = z.instanceof(Elementalerror)
  .transform(v => v.data$)
  .pipe(z.object({
    code: z.number().int().optional(),
    data: z.lazy(() => Data$outboundSchema).optional(),
    description: z.string().optional(),
    subject: z.string().optional(),
    title: z.string().optional(),
    trace: z.string().optional(),
  }));

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace Elementalerror$ {
  /** @deprecated use `Elementalerror$inboundSchema` instead. */
  export const inboundSchema = Elementalerror$inboundSchema;
  /** @deprecated use `Elementalerror$outboundSchema` instead. */
  export const outboundSchema = Elementalerror$outboundSchema;
  /** @deprecated use `Elementalerror$Outbound` instead. */
  export type Outbound = Elementalerror$Outbound;
}
