# Mcptoolannotations

Represents the tool annotations as they can be optionally defined for MCP tools.

## Example Usage

```typescript
import { Mcptoolannotations } from "@acuvity/acuvity/models/components";

let value: Mcptoolannotations = {};
```

## Fields

| Field                                                             | Type                                                              | Required                                                          | Description                                                       |
| ----------------------------------------------------------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------- |
| `destructiveHint`                                                 | *boolean*                                                         | :heavy_minus_sign:                                                | If true, the tool may perform destructive updates.                |
| `idempotentHint`                                                  | *boolean*                                                         | :heavy_minus_sign:                                                | If true, repeated calls with same args have no additional effect. |
| `openWorldHint`                                                   | *boolean*                                                         | :heavy_minus_sign:                                                | If true, tool interacts with external entities.                   |
| `readOnlyHint`                                                    | *boolean*                                                         | :heavy_minus_sign:                                                | If true, the tool does not modify its environment.                |
| `title`                                                           | *string*                                                          | :heavy_minus_sign:                                                | Human-readable title for the tool.                                |