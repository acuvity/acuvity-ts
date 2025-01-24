/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import * as components from "../models/components/index.js";
import { HTTPClient } from "./http.js";
import { Logger } from "./logger.js";
import { RetryConfig } from "./retries.js";
import { Params, pathToFunc } from "./url.js";

/**
 * Contains the list of servers available to the SDK
 */
export const ServerList = [
  /**
   * The Apex API server which is specific to every organization.
   *
   * @remarks
   * The apex_domain and apex_port variables can be determined by a call to
   * the well-known Apex info endpoint on the backend.
   */
  "https://{apex_domain}:{apex_port}",
] as const;

export type SDKOptions = {
  /**
   * The security details required to authenticate the SDK
   */
  security?: components.Security | (() => Promise<components.Security>);

  httpClient?: HTTPClient;
  /**
   * Allows overriding the default server used by the SDK
   */
  serverIdx?: number;
  /**
   * Sets the apex_domain variable for url substitution
   */
  apexDomain?: string;
  /**
   * Sets the apex_port variable for url substitution
   */
  apexPort?: string;
  /**
   * Allows overriding the default server URL used by the SDK
   */
  serverURL?: string;
  /**
   * Allows overriding the default retry config used by the SDK
   */
  retryConfig?: RetryConfig;
  timeoutMs?: number;
  debugLogger?: Logger;
};

export function serverURLFromOptions(options: SDKOptions): URL | null {
  let serverURL = options.serverURL;

  const serverParams: Params[] = [
    {
      "apex_domain": options.apexDomain ?? "apex.acuvity.ai",
      "apex_port": options.apexPort ?? "443",
    },
  ];
  let params: Params = {};

  if (!serverURL) {
    const serverIdx = options.serverIdx ?? 0;
    if (serverIdx < 0 || serverIdx >= ServerList.length) {
      throw new Error(`Invalid server index ${serverIdx}`);
    }
    serverURL = ServerList[serverIdx] || "";
    params = serverParams[serverIdx] || {};
  }

  const u = pathToFunc(serverURL)(params);
  return new URL(u);
}

export const SDK_METADATA = {
  language: "typescript",
  openapiDocVersion: "1.0",
  sdkVersion: "0.5.1",
  genVersion: "2.496.0",
  userAgent: "speakeasy-sdk/typescript 0.5.1 2.496.0 1.0 @acuvity/acuvity",
} as const;
