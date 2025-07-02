# Extractionsummary

Represents the summary of the extractions.

## Example Usage

```typescript
import { Extractionsummary } from "@acuvity/acuvity/models/components";

let value: Extractionsummary = {};
```

## Fields

| Field                                                                        | Type                                                                         | Required                                                                     | Description                                                                  |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `categories`                                                                 | Record<string, *any*>                                                        | :heavy_minus_sign:                                                           | The categories are remapping of the modalities in a more human friendly way. |
| `confidenceLevels`                                                           | Record<string, *any*>                                                        | :heavy_minus_sign:                                                           | The detected confidence levels.                                              |
| `dataSets`                                                                   | Record<string, *any*>                                                        | :heavy_minus_sign:                                                           | The detected datasets.                                                       |
| `dataTypes`                                                                  | Record<string, *any*>                                                        | :heavy_minus_sign:                                                           | The detected dataTypes.                                                      |
| `exploits`                                                                   | Record<string, *any*>                                                        | :heavy_minus_sign:                                                           | The various exploits attempts.                                               |
| `intent`                                                                     | Record<string, *any*>                                                        | :heavy_minus_sign:                                                           | The estimated intent embodied into the text.                                 |
| `keywords`                                                                   | Record<string, *any*>                                                        | :heavy_minus_sign:                                                           | The keywords found during classification.                                    |
| `languages`                                                                  | Record<string, *any*>                                                        | :heavy_minus_sign:                                                           | The language of the classification.                                          |
| `malcontents`                                                                | Record<string, *any*>                                                        | :heavy_minus_sign:                                                           | The various malcontents attempts.                                            |
| `modalities`                                                                 | Record<string, *any*>                                                        | :heavy_minus_sign:                                                           | The modalities of data detected in the data.                                 |
| `topics`                                                                     | Record<string, *any*>                                                        | :heavy_minus_sign:                                                           | The topic of the classification.                                             |