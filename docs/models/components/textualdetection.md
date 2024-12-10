# Textualdetection

Represents a textual detection done by policy.

## Example Usage

```typescript
import { Textualdetection } from "@acuvity/acuvity/models/components";

let value: Textualdetection = {};
```

## Fields

| Field                                                                              | Type                                                                               | Required                                                                           | Description                                                                        |
| ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `end`                                                                              | *number*                                                                           | :heavy_minus_sign:                                                                 | The end position of the detection.                                                 |
| `key`                                                                              | *string*                                                                           | :heavy_minus_sign:                                                                 | The key that is used in the name's place, If empty, a sequence of X's are used.    |
| `name`                                                                             | *string*                                                                           | :heavy_minus_sign:                                                                 | The name of the detection.                                                         |
| `score`                                                                            | *number*                                                                           | :heavy_minus_sign:                                                                 | The confidence score of the detection.                                             |
| `start`                                                                            | *number*                                                                           | :heavy_minus_sign:                                                                 | The start position of the detection.                                               |
| `type`                                                                             | [components.TextualdetectionType](../../models/components/textualdetectiontype.md) | :heavy_minus_sign:                                                                 | The type of detection.                                                             |