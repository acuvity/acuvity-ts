# acuvity

Developer-friendly & type-safe Typescript SDK specifically catered to leverage the Acuvity APIs - in particularly the Apex API.

<div align="left">
    <a href="https://www.apache.org/licenses/LICENSE-2.0.html">
        <img src="https://img.shields.io/badge/License-Apache_2.0-blue.svg" style="width: 100px; height: 28px;" />
    </a>
</div>

<!-- Start Summary [summary] -->
## Summary

Apex API: Acuvity Apex provides access to scan and detection APIs
<!-- End Summary [summary] -->

<!-- Start Table of Contents [toc] -->
## Table of Contents
<!-- $toc-max-depth=2 -->
* [acuvity](#acuvity)
  * [SDK Installation](#sdk-installation)
  * [Requirements](#requirements)
  * [SDK Example Usage](#sdk-example-usage)
  * [Available Resources and Operations](#available-resources-and-operations)
  * [Standalone functions](#standalone-functions)
  * [Retries](#retries)
  * [Error Handling](#error-handling)
  * [Server Selection](#server-selection)
  * [Custom HTTP Client](#custom-http-client)
  * [Authentication](#authentication)
  * [Debugging](#debugging)
* [Development](#development)
  * [Maturity](#maturity)
  * [Contributions](#contributions)

<!-- End Table of Contents [toc] -->

<!-- Start SDK Installation [installation] -->
## SDK Installation

The SDK can be installed with either [npm](https://www.npmjs.com/), [pnpm](https://pnpm.io/), [bun](https://bun.sh/) or [yarn](https://classic.yarnpkg.com/en/) package managers.

### NPM

```bash
npm add @acuvity/acuvity
```

### PNPM

```bash
pnpm add @acuvity/acuvity
```

### Bun

```bash
bun add @acuvity/acuvity
```

### Yarn

```bash
yarn add @acuvity/acuvity zod

# Note that Yarn does not install peer dependencies automatically. You will need
# to install zod as shown above.
```

> [!NOTE]
> This package is published with CommonJS and ES Modules (ESM) support.
<!-- End SDK Installation [installation] -->

<!-- Start Requirements [requirements] -->
## Requirements

For supported JavaScript runtimes, please consult [RUNTIMES.md](RUNTIMES.md).
<!-- End Requirements [requirements] -->

<!-- No SDK Example Usage [usage] -->
## SDK Example Usage

### Process a scan request

Now you can submit a scan request using the Scan API.

```typescript
import { Acuvity, discoverApex } from "@acuvity/acuvity";

async function run() {
  const acuvity = new Acuvity(await discoverApex({
    security: {
      token: process.env.ACUVITY_TOKEN,
    },
  }));

  const result = await acuvity.apex.scan({
    messages: ["Using a weather forecasting service, provide me with a weather forecast for the next ten days for Sunnyvale, CA."],
  });

  // Handle the result
  console.log(result);
}

run();

```

### List all available analyzers

Now you can list all available analyzers that can be used in the Scan API.

```typescript
import { Acuvity, discoverApex } from "@acuvity/acuvity";

async function run() {
  const acuvity = new Acuvity(await discoverApex({
    security: {
      token: process.env.ACUVITY_TOKEN,
    },
  }));

  const result = await acuvity.apex.listAnalyzers();

  // Handle the result
  console.log(result);
}

run();

```

**NOTE:** If you simply want to get a list of analyzer names or groups that can be used in the scan API, use `listAnalyzerNames()` or `listAnalyzerGroups()` instead.
<!-- No SDK Example Usage [usage] -->

<!-- Start Available Resources and Operations [operations] -->
## Available Resources and Operations

<details open>
<summary>Available methods</summary>


### [apex](docs/sdks/apex/README.md)

* [listAnalyzers](docs/sdks/apex/README.md#listanalyzers) - List of all available analyzers.
* [scanRequest](docs/sdks/apex/README.md#scanrequest) - Processes the scan request.

</details>
<!-- End Available Resources and Operations [operations] -->

<!-- Start Standalone functions [standalone-funcs] -->
## Standalone functions

All the methods listed above are available as standalone functions. These
functions are ideal for use in applications running in the browser, serverless
runtimes or other environments where application bundle size is a primary
concern. When using a bundler to build your application, all unused
functionality will be either excluded from the final bundle or tree-shaken away.

To read more about standalone functions, check [FUNCTIONS.md](./FUNCTIONS.md).

<details>

<summary>Available standalone functions</summary>

- [`apexListAnalyzers`](docs/sdks/apex/README.md#listanalyzers) - List of all available analyzers.
- [`apexScanRequest`](docs/sdks/apex/README.md#scanrequest) - Processes the scan request.

</details>
<!-- End Standalone functions [standalone-funcs] -->

<!-- No Retries [retries] -->
## Retries

Some of the endpoints in this SDK support retries.  If you use the SDK without any configuration, it will fall back to the default retry strategy provided by the API.  However, the default retry strategy can be overridden on a per-operation basis, or across the entire SDK.

To change the default retry strategy for a single API call, simply provide a retryConfig object to the call:
```typescript
import { Acuvity, discoverApex } from "@acuvity/acuvity";

async function run() {
  const acuvity = new Acuvity(await discoverApex({
    security: {
      token: process.env.ACUVITY_TOKEN,
    },
  }));

  const result = await acuvity.apex.listAnalyzers({
    retries: {
      strategy: "backoff",
      backoff: {
        initialInterval: 1,
        maxInterval: 50,
        exponent: 1.1,
        maxElapsedTime: 100,
      },
      retryConnectionErrors: false,
    },
  });

  // Handle the result
  console.log(result);
}

run();

```

If you'd like to override the default retry strategy for all operations that support retries, you can provide a retryConfig at SDK initialization:
```typescript
import { Acuvity, discoverApex } from "@acuvity/acuvity";

async function run() {
  const acuvity = new Acuvity(await discoverApex({
    retryConfig: {
      strategy: "backoff",
      backoff: {
        initialInterval: 1,
        maxInterval: 50,
        exponent: 1.1,
        maxElapsedTime: 100,
      },
      retryConnectionErrors: false,
    },
    security: {
      token: process.env.ACUVITY_TOKEN,
    },
  }));

  const result = await acuvity.apex.listAnalyzers();

  // Handle the result
  console.log(result);
}

run();

```
<!-- No Retries [retries] -->

<!-- No Error Handling [errors] -->
## Error Handling

All SDK methods return a response object or throw an error. By default, an API error will throw a `errors.APIError`.

If a HTTP request fails, an operation my also throw an error from the `models/errors/httpclienterrors.ts` module:

| HTTP Client Error                                    | Description                                          |
| ---------------------------------------------------- | ---------------------------------------------------- |
| RequestAbortedError                                  | HTTP request was aborted by the client               |
| RequestTimeoutError                                  | HTTP request timed out due to an AbortSignal signal  |
| ConnectionError                                      | HTTP client was unable to make a request to a server |
| InvalidRequestError                                  | Any input used to create a request is invalid        |
| UnexpectedClientError                                | Unrecognised or unexpected error                     |

In addition, when custom error responses are specified for an operation, the SDK may throw their associated Error type. You can refer to respective *Errors* tables in SDK docs for more details on possible error types for each operation. For example, the `listAnalyzers` method may throw the following errors:

| Error Type            | Status Code   | Content Type     |
| --------------------- | ------------- | ---------------- |
| errors.Elementalerror | 400, 401, 500 | application/json |
| errors.APIError       | 4XX, 5XX      | \*/\*            |

```typescript
import { Acuvity, discoverApex } from "@acuvity/acuvity";
import {
  Elementalerror,
  SDKValidationError,
} from "@acuvity/acuvity/models/errors";

async function run() {
  const acuvity = new Acuvity(await discoverApex({
    security: {
      token: process.env.ACUVITY_TOKEN,
    },
  }));

  let result;
  try {
    result = await acuvity.apex.listAnalyzers();

    // Handle the result
    console.log(result);
  } catch (err) {
    switch (true) {
      case (err instanceof SDKValidationError): {
        // Validation errors can be pretty-printed
        console.error(err.pretty());
        // Raw value may also be inspected
        console.error(err.rawValue);
        return;
      }
      case (err instanceof Elementalerror): {
        // Handle err.data$: ElementalerrorData
        console.error(err);
        return;
      }
      default: {
        throw err;
      }
    }
  }
}

run();

```

Validation errors can also occur when either method arguments or data returned from the server do not match the expected format. The `SDKValidationError` that is thrown as a result will capture the raw value that failed validation in an attribute called `rawValue`. Additionally, a `pretty()` method is available on this error that can be used to log a nicely formatted string since validation errors can list many issues and the plain error string may be difficult read when debugging.
<!-- No Error Handling [errors] -->

<!-- No Server Selection [server] -->
## Server Selection

### Server Variables

The default server `https://{apex_domain}:{apex_port}` contains variables and is set to `https://apex.acuvity.ai:443` by default. Note that the default values **DO NOT** point to a valid and existing Apex URL as they are specific and unique to every organization. Therefore both variables must be set. The following parameters are available when initializing the SDK client instance:
 * `apexDomain: string`
 * `apexPort: string`

However, it is highly recommended to determine your Apex URL automatically which can be achieved from the provided token. Therefore you should in most cases simply use the `discoverApex()` wrapper as shown in all usage examples which takes an `SDKOptions` object and returns an `SDKOptions` object with the enhanced variables set. If this operation fails, it will throw an exception.

### Override Server URL Per-Client

The default server can also be overridden globally by passing a URL to the `serverURL: string` optional parameter when initializing the SDK client instance. For example:
```typescript
import { Acuvity } from "@acuvity/acuvity";

const acuvity = new Acuvity({
  serverURL: "https://my-enterprise-apex.example.com:443",
  security: {
    token: "<YOUR_BEARER_TOKEN_HERE>",
  },
});

async function run() {
  const result = await acuvity.apex.listAnalyzers();

  // Handle the result
  console.log(result);
}

run();

```
<!-- No Server Selection [server] -->

<!-- Start Custom HTTP Client [http-client] -->
## Custom HTTP Client

The TypeScript SDK makes API calls using an `HTTPClient` that wraps the native
[Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API). This
client is a thin wrapper around `fetch` and provides the ability to attach hooks
around the request lifecycle that can be used to modify the request or handle
errors and response.

The `HTTPClient` constructor takes an optional `fetcher` argument that can be
used to integrate a third-party HTTP client or when writing tests to mock out
the HTTP client and feed in fixtures.

The following example shows how to use the `"beforeRequest"` hook to to add a
custom header and a timeout to requests and how to use the `"requestError"` hook
to log errors:

```typescript
import { Acuvity } from "@acuvity/acuvity";
import { HTTPClient } from "@acuvity/acuvity/lib/http";

const httpClient = new HTTPClient({
  // fetcher takes a function that has the same signature as native `fetch`.
  fetcher: (request) => {
    return fetch(request);
  }
});

httpClient.addHook("beforeRequest", (request) => {
  const nextRequest = new Request(request, {
    signal: request.signal || AbortSignal.timeout(5000)
  });

  nextRequest.headers.set("x-custom-header", "custom value");

  return nextRequest;
});

httpClient.addHook("requestError", (error, request) => {
  console.group("Request Error");
  console.log("Reason:", `${error}`);
  console.log("Endpoint:", `${request.method} ${request.url}`);
  console.groupEnd();
});

const sdk = new Acuvity({ httpClient });
```
<!-- End Custom HTTP Client [http-client] -->

<!-- No Authentication [security] -->
## Authentication

### Per-Client Security Schemes

This SDK supports the following security schemes globally:

| Name     | Type   | Scheme      |
| -------- | ------ | ----------- |
| `token`  | http   | HTTP Bearer |
| `cookie` | apiKey | API key     |

You can set the security parameters through the `security` optional parameter when initializing the SDK client instance. The selected scheme will be used by default to authenticate with the API for all operations that support it. For example:
```typescript
import { Acuvity, discoverApex } from "@acuvity/acuvity";

async function run() {
  const acuvity = new Acuvity(await discoverApex({
    security: {
      token: "<YOUR_BEARER_TOKEN_HERE>",
    },
  }));

  const result = await acuvity.apex.listAnalyzers();

  // Handle the result
  console.log(result);
}

run();

```
<!-- No Authentication [security] -->

<!-- Start Debugging [debug] -->
## Debugging

You can setup your SDK to emit debug logs for SDK requests and responses.

You can pass a logger that matches `console`'s interface as an SDK option.

> [!WARNING]
> Beware that debug logging will reveal secrets, like API tokens in headers, in log messages printed to a console or files. It's recommended to use this feature only during local development and not in production.

```typescript
import { Acuvity } from "@acuvity/acuvity";

const sdk = new Acuvity({ debugLogger: console });
```
<!-- End Debugging [debug] -->

<!-- Placeholder for Future Speakeasy SDK Sections -->

# Development

## Maturity

This SDK is in beta, and there may be breaking changes between versions without a major version update. Therefore, we recommend pinning usage
to a specific package version. This way, you can install the same version each time without breaking changes unless you are intentionally
looking for the latest version.

## Contributions

While we value open-source contributions to this SDK, this library is generated programmatically. Any manual changes added to internal files will be overwritten on the next generation. 
We look forward to hearing your feedback. Feel free to open a PR or an issue with a proof of concept and we'll do our best to include it in a future release. 
