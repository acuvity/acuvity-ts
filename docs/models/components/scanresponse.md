# Scanresponse

This is a scan response.

## Example Usage

```typescript
import { Scanresponse } from "@acuvity/acuvity/models/components";

let value: Scanresponse = {
  alerts: [
    {
      alertDefinition: "warning-notification",
      principal: {
        ip: "192.0.2.42",
        app: {
          component: "frontend",
          labels: [
            "country=us",
            "another-label",
          ],
          name: "MyApp",
          user: {
            email: "john.doe@acme.com",
            name: "John Doe",
            tokenValidated: false,
          },
        },
        teams: [
          "admins",
        ],
        tokenName: "my-user-token",
        type: "User",
        user: {
          name: "user@company.com",
        },
      },
    },
  ],
  client: "curl",
  clientVersion: "7.64.1",
  extractions: [
    {
      piIs: {
        "ssn": 0.8,
      },
      categories: [
        {
          group: "image",
          type: "png",
        },
      ],
      confidentiality: 0.9,
      customDataTypes: {
        "my_cdt": 1,
      },
      dataSets: {
        "cds": {
          "ct1": 1,
          "ct2": 2,
        },
      },
      exploits: {
        "prompt_injection": 0.8,
      },
      intent: {
        "write": 0.8,
      },
      keywords: {
        "my_keywork": 0.8,
      },
      languages: {
        "english": 0.8,
      },
      malcontents: {
        "toxic": 0.8,
      },
      modalities: [
        {
          group: "image",
          type: "png",
        },
      ],
      relevance: 0.9,
      secrets: {
        "credentials": 0.7,
      },
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
      ],
      topics: {
        "category/enterprise": 0.7,
        "department/logistics": 0.8,
        "depict/document": 0.8,
        "extracted/typed_text_content": 1,
        "timeframe/current_year": 0.6,
      },
    },
  ],
  mcpMessage: {
    direction: "Client2Server",
    method: "tools/call",
    requestID: "2",
    sessionID: "1f02aa20-22d8-6e87-8432-be15d4f7b5b2",
    type: "Request",
  },
  model: "claude-3-7-sonnet",
  principal: {
    ip: "192.0.2.42",
    app: {
      component: "frontend",
      labels: [
        "country=us",
        "another-label",
      ],
      name: "MyApp",
      user: {
        email: "john.doe@acme.com",
        name: "John Doe",
        tokenValidated: false,
      },
    },
    teams: [
      "admins",
    ],
    tokenName: "my-user-token",
    type: "User",
    user: {
      name: "user@company.com",
    },
  },
  provider: "openai",
  tools: {
    "0": {},
    "1": {},
    "2": {},
    "3": {},
    "4": {},
    "5": {},
    "6": {},
    "7": {},
    "8": {},
    "9": {},
    "10": {},
    "11": {},
    "12": {},
    "13": {},
    "14": {},
    "15": {},
    "16": {},
    "17": {},
    "18": {},
    "19": {},
    "20": {},
    "21": {},
    "22": {},
    "23": {},
    "24": {},
    "25": {},
    "26": {},
    "27": {},
    "28": {},
    "29": {},
    "30": {},
    "31": {},
    "32": {},
    "33": {},
    "34": {},
    "35": {},
    "36": {},
    "37": {},
    "38": {},
    "39": {},
    "40": {},
    "41": {},
    "42": {},
    "43": {},
    "44": {},
    "45": {},
    "46": {},
    "47": {},
    "48": {},
    "49": {},
    "50": {},
    "51": {},
    "52": {},
    "53": {},
    "54": {},
    "55": {},
    "56": {},
    "57": {},
    "58": {},
    "59": {},
    "60": {},
    "61": {},
    "62": {},
    "63": {},
    "64": {},
    "65": {},
    "66": {},
    "67": {},
    "68": {},
    "69": {},
    "70": {},
    "71": {},
    "72": {},
    "73": {},
    "74": {},
    "75": {},
    "76": {},
    "77": {},
    "78": {},
    "79": {},
    "80": {},
    "81": {},
  },
  trace: {
    parentSpanID: "00f067aa0ba902b7",
    spanEnd: new Date("2025-03-22T14:35:00.123456789Z"),
    spanID: "6ba80aaa3b2f43d8",
    spanName: "acuvity_prompt_input_analysis",
    spanStart: new Date("2025-03-22T14:35:00.123456789Z"),
    statusMessage: "Failed to make API call to service Foo.",
    traceID: "4bf92f3577b34da6a3ce929d0e0e4736",
    transparentSpanID: "6ba80aaa3b2f43d8",
  },
};
```

## Fields

| Field                                                                                         | Type                                                                                          | Required                                                                                      | Description                                                                                   | Example                                                                                       |
| --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `id`                                                                                          | *string*                                                                                      | :heavy_minus_sign:                                                                            | ID is the identifier of the object.                                                           |                                                                                               |
| `alerts`                                                                                      | [components.Alertevent](../../models/components/alertevent.md)[]                              | :heavy_minus_sign:                                                                            | List of alerts that got raised during the policy resolution.                                  |                                                                                               |
| `annotations`                                                                                 | Record<string, *string*>                                                                      | :heavy_minus_sign:                                                                            | Annotations attached to the log.                                                              |                                                                                               |
| `client`                                                                                      | *string*                                                                                      | :heavy_minus_sign:                                                                            | The client used to send the request.                                                          | curl                                                                                          |
| `clientVersion`                                                                               | *string*                                                                                      | :heavy_minus_sign:                                                                            | The version of the client used to send the request.                                           | 7.64.1                                                                                        |
| `decision`                                                                                    | [components.Decision](../../models/components/decision.md)                                    | :heavy_minus_sign:                                                                            | Tell what was the decision about the data.                                                    |                                                                                               |
| `extractions`                                                                                 | [components.Extraction](../../models/components/extraction.md)[]                              | :heavy_minus_sign:                                                                            | The extractions to log.                                                                       |                                                                                               |
| `hash`                                                                                        | *string*                                                                                      | :heavy_minus_sign:                                                                            | The hash of the input.                                                                        |                                                                                               |
| `latency`                                                                                     | [components.Latency](../../models/components/latency.md)                                      | :heavy_minus_sign:                                                                            | Holds information about latencies introduced by Apex.                                         |                                                                                               |
| `mcpMessage`                                                                                  | [components.Mcpmessage](../../models/components/mcpmessage.md)                                | :heavy_minus_sign:                                                                            | Represents MCP message details.                                                               |                                                                                               |
| `model`                                                                                       | *string*                                                                                      | :heavy_minus_sign:                                                                            | The model used by the request.                                                                | claude-3-7-sonnet                                                                             |
| `namespace`                                                                                   | *string*                                                                                      | :heavy_minus_sign:                                                                            | The namespace of the object.                                                                  |                                                                                               |
| `pipelineName`                                                                                | *string*                                                                                      | :heavy_minus_sign:                                                                            | The name of the particular pipeline that extracted the text.                                  |                                                                                               |
| `principal`                                                                                   | [components.Principal](../../models/components/principal.md)                                  | :heavy_check_mark:                                                                            | Describe the principal.                                                                       |                                                                                               |
| `provider`                                                                                    | *string*                                                                                      | :heavy_minus_sign:                                                                            | The provider to use.                                                                          | openai                                                                                        |
| `reasons`                                                                                     | *string*[]                                                                                    | :heavy_minus_sign:                                                                            | The various reasons returned by the policy engine.                                            |                                                                                               |
| `summary`                                                                                     | [components.Extractionsummary](../../models/components/extractionsummary.md)                  | :heavy_minus_sign:                                                                            | Represents the summary of the extractions.                                                    |                                                                                               |
| `time`                                                                                        | [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) | :heavy_minus_sign:                                                                            | Set the time of the message request.                                                          |                                                                                               |
| `toolChoice`                                                                                  | [components.Toolchoice](../../models/components/toolchoice.md)                                | :heavy_minus_sign:                                                                            | Represents the tool choice that can be passed along together with tools.                      |                                                                                               |
| `tools`                                                                                       | Record<string, [components.Tool](../../models/components/tool.md)>                            | :heavy_minus_sign:                                                                            | The various tools used by the request.                                                        | {<br/>  "tool1": {<br/>      "name": "tool1",<br/>      "description": "This is a tool."<br/>  }<br/>} |
| `trace`                                                                                       | [components.Traceref](../../models/components/traceref.md)                                    | :heavy_minus_sign:                                                                            | Holds all references to a trace which are also the essentials of the span data.               |                                                                                               |
| `type`                                                                                        | [components.ScanresponseType](../../models/components/scanresponsetype.md)                    | :heavy_minus_sign:                                                                            | The type of text.                                                                             |                                                                                               |