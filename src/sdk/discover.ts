import { jwtDecode } from 'jwt-decode';
import { HTTPClient } from "../lib/http.js";
import { SDKOptions } from "../lib/config.js";
import { Security } from "../models/components/index.js";

export async function discoverApex(options: SDKOptions = {}): Promise<SDKOptions> {
  // If a serverUrl is given, we don't need to perform discovery at all
  if (options.serverURL !== undefined && options.serverURL !== null && options.serverURL !== "") {
    return options;
  }

  // If an apexDomain is given, we also don't need to perform discovery
  if (options.apexDomain !== undefined && options.apexDomain !== null && options.apexDomain !== "") {
    return options;
  }

  // If there are no security options, we cannot perform discovery
  if (options.security === undefined || options.security === null) {
    return options;
  }

  // extract the token form options.security if it is defined
  let sec: Security;
  if (typeof options.security === 'function') {
    sec = await options.security();
  } else if (options.security !== undefined) {
    sec = options.security;
  } else {
    return options;
  }

  // in the browser you must use cookie-based authentication
  const isBrowser: boolean = typeof window !== "undefined" && typeof window.document !== "undefined"
  if (isBrowser && (sec.cookie === undefined || sec.cookie === null || sec.cookie === "")) {
    throw new Error("You are running in a browser, but the cookie was not set in security options. Only cookie-based authentication is supported in the browser.");
  }

  // extract the token now and get the API URL from the token which is the issuer URL
  const token = sec.token ?? sec.cookie;
  if (token === undefined) {
    return options;
  }
  const decodedToken: any = jwtDecode(token);
  if (!decodedToken?.iss) {
    throw new Error("Invalid token provided, missing iss claim.");
  }
  const apiURL = decodedToken.iss;

  // initialize HTTP client now
  // NOTE: for browsers we cannot use manual redirect handling, so we create a simple HTTPClient
  // NOTE: as we need a special one here for the redirect handling because of a bug in bun
  // https://github.com/oven-sh/bun/issues/10754
  // we're not going to reuse this client for anything else
  // and we're not going to set this on the options
  const client: HTTPClient = isBrowser
    ? new HTTPClient()
    : new HTTPClient({fetcher: (input, init) => {
      if (init == null) {
        return fetch(input, { redirect: "manual" });
      } else {
        return fetch(input, { ...init, redirect: "manual" });
      }
    }});

  // now make a GET request to {api_url}/.well-known/acuvity/my-apex.json
  // using the client and the token as a bearer token
  const { url: apexURL, port: apexPort }  = await fetchWellKnownApexInfo(isBrowser, apiURL, token, client);
  if (apexURL !== undefined) {
    options.apexDomain = apexURL.replace(/^https?:\/\//, '');
  }
  if (apexPort !== undefined) {
    options.apexPort = `${apexPort}`;
  }
  return options;
}

async function fetchWellKnownApexInfo(
  isBrowser: boolean,
  apiURL: string,
  token: string,
  client: HTTPClient,
  iteration: number = 0
): Promise<{ url?: string; port?: number }> {
  if (iteration >= 3) {
    throw new Error(`Max iterations (3) reached without resolving redirect.`);
  }

  // request handling needs to be different for browser than for the server runtimes
  // as we cannot use manual redirect handling in the browser for CORS and are therefore
  // also forced to use cookie-authentication which means that we must include credentials
  const req: Request = isBrowser
    ? new Request(`${apiURL}/.well-known/acuvity/my-apex.json`, {
        method: "GET",
        credentials: "include",
        redirect: "follow",
      })
    : new Request(`${apiURL}/.well-known/acuvity/my-apex.json`, {
        method: "GET",
        headers: new Headers({
          "Authorization": `Bearer ${token}`,
        }),
        redirect: "manual",
      });

  const resp: Response = await client.request(req);
  if (resp === undefined) {
    throw new Error("Failed to fetch well-known apex info: No response.");
  }
  // Check if the response is a redirect
  if (resp.status >= 300 && resp.status < 400) {
    const redirectURL = resp.headers.get("Location");
    if (!redirectURL) {
      throw new Error("Redirect response missing 'Location' header.");
    }
    // Perform the recursive call with the new URL
    return fetchWellKnownApexInfo(isBrowser, redirectURL, token, client, iteration + 1);
  } else if (resp.status !== 200) {
    throw new Error(`Failed to fetch well-known apex info: ${JSON.stringify(resp)}`);
  }

  // Decode the response body as JSON
  const responseBody = await resp.json();
  const url = responseBody.url;
  const port = responseBody.port;
  return { url, port };
}
