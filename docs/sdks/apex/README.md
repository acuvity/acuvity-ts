# Apex
(*apex*)

## Overview

This tag is for group 'apex'

### Available Operations

* [listAnalyzers](#listanalyzers) - List of all available analyzers.
* [scanRequest](#scanrequest) - Processes the scan request.

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
| errors.Elementalerror | 400, 401              | application/json      |
| errors.Elementalerror | 500                   | application/json      |
| errors.APIError       | 4XX, 5XX              | \*/\*                 |

## scanRequest

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
  const result = await acuvity.apex.scanRequest({
    analyzers: [
      "Malcontents",
    ],
    annotations: {
      "key1": "value1",
      "key2": "value2",
    },
    bypassHash: "6f37d752-bce1-4973-88f6-28b6c100ceb8",
    extractions: [
      {
        toolResults: [
          {
            callID: "toolu_019X5QaEeVTDFrQPHqMMgd1n",
          },
        ],
        toolUses: [
          {
            callID: "toolu_019X5QaEeVTDFrQPHqMMgd1n",
            name: "get_weather",
            serverName: "deepwiki",
          },
          {
            callID: "toolu_019X5QaEeVTDFrQPHqMMgd1n",
            name: "get_weather",
            serverName: "deepwiki",
          },
        ],
      },
    ],
    keywords: [
      "legal",
      "technical",
      "scientific",
    ],
    messages: [
      "Summarize the main points of this article in bullet points.",
      "Generate a list of creative product names for a futuristic tech gadget.",
    ],
    model: "claude-3-7-sonnet",
    redactions: [
      "person",
      "ssn",
      "location",
    ],
    tools: {
      "0": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "1": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "2": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "3": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "4": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "5": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "6": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "7": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "8": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "9": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "10": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "11": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "12": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "13": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "14": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "15": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "16": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "17": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "18": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "19": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "20": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "21": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "22": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "23": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "24": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "25": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "26": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "27": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "28": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "29": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "30": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "31": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "32": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "33": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "34": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "35": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "36": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "37": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "38": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "39": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "40": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "41": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "42": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "43": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "44": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "45": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "46": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "47": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "48": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "49": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "50": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "51": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "52": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "53": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "54": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "55": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "56": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "57": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "58": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "59": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "60": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "61": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "62": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "63": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "64": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "65": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "66": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "67": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "68": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "69": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "70": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "71": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "72": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "73": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "74": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "75": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "76": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "77": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "78": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "79": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "80": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "81": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
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
import { apexScanRequest } from "@acuvity/acuvity/funcs/apexScanRequest.js";

// Use `AcuvityCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const acuvity = new AcuvityCore({
  security: {
    token: "<YOUR_BEARER_TOKEN_HERE>",
  },
});

async function run() {
  const res = await apexScanRequest(acuvity, {
    analyzers: [
      "Malcontents",
    ],
    annotations: {
      "key1": "value1",
      "key2": "value2",
    },
    bypassHash: "6f37d752-bce1-4973-88f6-28b6c100ceb8",
    extractions: [
      {
        toolResults: [
          {
            callID: "toolu_019X5QaEeVTDFrQPHqMMgd1n",
          },
        ],
        toolUses: [
          {
            callID: "toolu_019X5QaEeVTDFrQPHqMMgd1n",
            name: "get_weather",
            serverName: "deepwiki",
          },
          {
            callID: "toolu_019X5QaEeVTDFrQPHqMMgd1n",
            name: "get_weather",
            serverName: "deepwiki",
          },
        ],
      },
    ],
    keywords: [
      "legal",
      "technical",
      "scientific",
    ],
    messages: [
      "Summarize the main points of this article in bullet points.",
      "Generate a list of creative product names for a futuristic tech gadget.",
    ],
    model: "claude-3-7-sonnet",
    redactions: [
      "person",
      "ssn",
      "location",
    ],
    tools: {
      "0": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "1": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "2": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "3": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "4": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "5": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "6": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "7": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "8": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "9": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "10": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "11": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "12": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "13": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "14": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "15": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "16": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "17": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "18": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "19": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "20": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "21": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "22": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "23": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "24": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "25": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "26": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "27": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "28": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "29": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "30": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "31": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "32": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "33": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "34": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "35": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "36": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "37": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "38": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "39": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "40": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "41": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "42": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "43": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "44": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "45": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "46": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "47": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "48": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "49": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "50": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "51": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "52": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "53": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "54": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "55": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "56": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "57": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "58": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "59": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "60": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "61": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "62": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "63": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "64": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "65": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "66": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "67": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "68": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "69": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "70": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "71": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "72": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "73": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "74": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "75": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "76": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "77": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "78": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "79": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "80": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
      "81": {
        mcpServer: {
          allowedTools: [
            "deepwiki_search",
            "deepwiki_fetch",
          ],
          name: "deepwiki",
          url: "https://mcp.deepwiki.com/mcp",
        },
        category: "Client",
        description: "Get the current weather in a given location",
        name: "get_weather",
        type: "computer_20250124",
      },
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
| errors.Elementalerror | 400, 403, 415, 422    | application/json      |
| errors.Elementalerror | 500                   | application/json      |
| errors.APIError       | 4XX, 5XX              | \*/\*                 |