# Mcpserver

Represents an MCP server object.

## Example Usage

```typescript
import { Mcpserver } from "@acuvity/acuvity/models/components";

let value: Mcpserver = {
  allowedTools: [
    "deepwiki_search",
    "deepwiki_fetch",
  ],
  name: "deepwiki",
  url: "https://mcp.deepwiki.com/mcp",
};
```

## Fields

| Field                                                                                                                                      | Type                                                                                                                                       | Required                                                                                                                                   | Description                                                                                                                                | Example                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `allowedTools`                                                                                                                             | *string*[]                                                                                                                                 | :heavy_minus_sign:                                                                                                                         | The allowed tools that the caller has access to. If empty, this means that the<br/>caller has access to all tools provided by this MCP server. | [<br/>"deepwiki_search",<br/>"deepwiki_fetch"<br/>]                                                                                        |
| `name`                                                                                                                                     | *string*                                                                                                                                   | :heavy_minus_sign:                                                                                                                         | The name of the MCP server.                                                                                                                | deepwiki                                                                                                                                   |
| `url`                                                                                                                                      | *string*                                                                                                                                   | :heavy_check_mark:                                                                                                                         | The URL of the MCP server.                                                                                                                 | https://mcp.deepwiki.com/mcp                                                                                                               |