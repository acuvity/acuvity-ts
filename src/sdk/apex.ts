/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import { apexListAnalyzers } from "../funcs/apexListAnalyzers.js";
import { apexPoliceRequest } from "../funcs/apexPoliceRequest.js";
import { apexScanRequest } from "../funcs/apexScanRequest.js";
import { ClientSDK, RequestOptions } from "../lib/sdks.js";
import * as components from "../models/components/index.js";
import { unwrapAsync } from "../types/fp.js";

export class Apex extends ClientSDK {
  /**
   * List of all available analyzers.
   */
  async listAnalyzers(
    options?: RequestOptions,
  ): Promise<Array<components.Analyzer>> {
    return unwrapAsync(apexListAnalyzers(
      this,
      options,
    ));
  }

  /**
   * Processes the scan and police request.
   */
  async policeRequest(
    request: components.Policerequest,
    options?: RequestOptions,
  ): Promise<components.Policeresponse> {
    return unwrapAsync(apexPoliceRequest(
      this,
      request,
      options,
    ));
  }

  /**
   * Processes the scan request.
   */
  async scanRequest(
    request: components.Scanrequest,
    options?: RequestOptions,
  ): Promise<components.Scanresponse> {
    return unwrapAsync(apexScanRequest(
      this,
      request,
      options,
    ));
  }
}
