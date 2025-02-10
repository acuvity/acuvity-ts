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
        app: {
          labels: [
            "country=us",
            "another-label",
          ],
          name: "MyApp",
          tier: "frontend",
        },
        team: "admins",
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
      exploits: {
        "prompt_injection": 0.8,
      },
      intent: {
        "write": 0.8,
      },
      keywords: {
        "my_keyworkd": 0.8,
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
      topics: {
        "category/enterprise": 0.7,
        "department/logistics": 0.8,
        "depict/document": 0.8,
        "extracted/typed_text_content": 1,
        "timeframe/current_year": 0.6,
      },
    },
  ],
  principal: {
    app: {
      labels: [
        "country=us",
        "another-label",
      ],
      name: "MyApp",
      tier: "frontend",
    },
    team: "admins",
    tokenName: "my-user-token",
    type: "User",
    user: {
      name: "user@company.com",
    },
  },
  provider: "openai",
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
| `namespace`                                                                                   | *string*                                                                                      | :heavy_minus_sign:                                                                            | The namespace of the object.                                                                  |                                                                                               |
| `pipelineName`                                                                                | *string*                                                                                      | :heavy_minus_sign:                                                                            | The name of the particular pipeline that extracted the text.                                  |                                                                                               |
| `principal`                                                                                   | [components.Principal](../../models/components/principal.md)                                  | :heavy_check_mark:                                                                            | Describe the principal.                                                                       |                                                                                               |
| `provider`                                                                                    | *string*                                                                                      | :heavy_minus_sign:                                                                            | the provider to use.                                                                          | openai                                                                                        |
| `reasons`                                                                                     | *string*[]                                                                                    | :heavy_minus_sign:                                                                            | The various reasons returned by the policy engine.                                            |                                                                                               |
| `summary`                                                                                     | [components.Extractionsummary](../../models/components/extractionsummary.md)                  | :heavy_minus_sign:                                                                            | Represents the summary of the extractions.                                                    |                                                                                               |
| `time`                                                                                        | [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) | :heavy_minus_sign:                                                                            | Set the time of the message request.                                                          |                                                                                               |
| `type`                                                                                        | [components.ScanresponseType](../../models/components/scanresponsetype.md)                    | :heavy_minus_sign:                                                                            | The type of text.                                                                             |                                                                                               |