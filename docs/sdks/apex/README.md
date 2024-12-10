# Apex
(*apex*)

## Overview

Apex is the proxy and detectiono API service of Acuvity.

### Available Operations

* [listAnalyzers](#listanalyzers) - List of all available analyzers.
* [scan](#scan) - Processes the scan request.

## listAnalyzers

List of all available analyzers.

### Example Usage

```typescript
import { Acuvity } from "@acuvity/acuvity";

const acuvity = new Acuvity({
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

### Standalone function

The standalone function version of this method:

```typescript
import { AcuvityCore } from "@acuvity/acuvity/core.js";
import { apexListAnalyzers } from "@acuvity/acuvity/funcs/apexListAnalyzers.js";

// Use `AcuvityCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const acuvity = new AcuvityCore({
  security: {
    token: "<YOUR_BEARER_TOKEN_HERE>",
  },
});

async function run() {
  const res = await apexListAnalyzers(acuvity);

  if (!res.ok) {
    throw res.error;
  }

  const { value: result } = res;

  // Handle the result
  console.log(result);
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[components.Analyzer[]](../../models/.md)\>**

### Errors

| Error Type            | Status Code           | Content Type          |
| --------------------- | --------------------- | --------------------- |
| errors.Elementalerror | 400, 401, 500         | application/json      |
| errors.APIError       | 4XX, 5XX              | \*/\*                 |

## scan

Processes the scan request.

### Example Usage

```typescript
import { Acuvity } from "@acuvity/acuvity";

const acuvity = new Acuvity({
  security: {
    token: "<YOUR_BEARER_TOKEN_HERE>",
  },
});

async function run() {
  const result = await acuvity.apex.scan({
    bypassHash: "Alice",
    user: {
      claims: [
        "@org=acuvity.ai",
        "given_name=John",
        "family_name=Doe",
      ],
      name: "Alice",
    },
  });

  // Handle the result
  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { AcuvityCore } from "@acuvity/acuvity/core.js";
import { apexScan } from "@acuvity/acuvity/funcs/apexScan.js";

// Use `AcuvityCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const acuvity = new AcuvityCore({
  security: {
    token: "<YOUR_BEARER_TOKEN_HERE>",
  },
});

async function run() {
  const res = await apexScan(acuvity, {
    bypassHash: "Alice",
    user: {
      claims: [
        "@org=acuvity.ai",
        "given_name=John",
        "family_name=Doe",
      ],
      name: "Alice",
    },
  });

  if (!res.ok) {
    throw res.error;
  }

  const { value: result } = res;

  // Handle the result
  console.log(result);
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [components.Scanrequest](../../models/components/scanrequest.md)                                                                                                               | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[components.Scanresponse](../../models/components/scanresponse.md)\>**

### Errors

| Error Type            | Status Code           | Content Type          |
| --------------------- | --------------------- | --------------------- |
| errors.Elementalerror | 400, 403, 422, 500    | application/json      |
| errors.APIError       | 4XX, 5XX              | \*/\*                 |