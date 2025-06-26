# Tooluse

Represents the tool use which are instructions by a model on what tool to call
and how.

## Example Usage

```typescript
import { Tooluse } from "@acuvity/acuvity/models/components";

let value: Tooluse = {
  callID: "toolu_019X5QaEeVTDFrQPHqMMgd1n",
  name: "get_weather",
  serverName: "deepwiki",
};
```

## Fields

| Field                                                                                                                                  | Type                                                                                                                                   | Required                                                                                                                               | Description                                                                                                                            | Example                                                                                                                                |
| -------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `callID`                                                                                                                               | *string*                                                                                                                               | :heavy_check_mark:                                                                                                                     | The ID of the tool use which the user or application must pass when posting back<br/>the tool call results.                            | toolu_019X5QaEeVTDFrQPHqMMgd1n                                                                                                         |
| `input`                                                                                                                                | *string*                                                                                                                               | :heavy_minus_sign:                                                                                                                     | The input to the tool call. This should be a JSON object which must conform to<br/>the JSON schema as was previously defined for the tool. |                                                                                                                                        |
| `name`                                                                                                                                 | *string*                                                                                                                               | :heavy_check_mark:                                                                                                                     | The name of the tool to call.                                                                                                          | get_weather                                                                                                                            |
| `serverName`                                                                                                                           | *string*                                                                                                                               | :heavy_minus_sign:                                                                                                                     | The name of the remote MCP server that will execute this call.                                                                         | deepwiki                                                                                                                               |