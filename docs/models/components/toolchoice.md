# Toolchoice

Represents the tool choice that can be passed along together with tools.

## Example Usage

```typescript
import { Toolchoice } from "@acuvity/acuvity/models/components";

let value: Toolchoice = {};
```

## Fields

| Field                                                               | Type                                                                | Required                                                            | Description                                                         |
| ------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------- |
| `choice`                                                            | [components.Choice](../../models/components/choice.md)              | :heavy_minus_sign:                                                  | Model instructions on tool choice.                                  |
| `name`                                                              | *string*                                                            | :heavy_minus_sign:                                                  | If choice is Tool, this will be set to the name of the tool to use. |