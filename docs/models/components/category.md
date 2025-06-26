# Category

The category of the tool. This relays information about where the tool is being
used. This can be empty if unknown or if this is a tool listing of MCP servers.

## Example Usage

```typescript
import { Category } from "@acuvity/acuvity/models/components";

let value: Category = "Client";
```

## Values

```typescript
"Client" | "Server" | "RemoteMCP"
```