# Toolresult

Represents the tool result as passed in by the user or application after calling
a tool.

## Example Usage

```typescript
import { Toolresult } from "@acuvity/acuvity/models/components";

let value: Toolresult = {
  callID: "toolu_019X5QaEeVTDFrQPHqMMgd1n",
};
```

## Fields

| Field                                                                        | Type                                                                         | Required                                                                     | Description                                                                  | Example                                                                      |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `callID`                                                                     | *string*                                                                     | :heavy_check_mark:                                                           | The ID of the tool use as previously returned by a models tool use response. | toolu_019X5QaEeVTDFrQPHqMMgd1n                                               |
| `content`                                                                    | *string*                                                                     | :heavy_minus_sign:                                                           | The content of the tool call results.                                        |                                                                              |
| `isError`                                                                    | *boolean*                                                                    | :heavy_minus_sign:                                                           | Indicates if the tool call failed.                                           |                                                                              |