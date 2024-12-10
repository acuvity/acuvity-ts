# Principalapp

Describes the principal information of an application.

## Example Usage

```typescript
import { Principalapp } from "@acuvity/acuvity/models/components";

let value: Principalapp = {
  labels: [
    "country=us",
    "another-label",
  ],
  name: "MyApp",
  tier: "frontend",
};
```

## Fields

| Field                                                  | Type                                                   | Required                                               | Description                                            | Example                                                |
| ------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------ |
| `labels`                                               | *string*[]                                             | :heavy_minus_sign:                                     | The list of labels attached to an application request. | [<br/>"country=us",<br/>"another-label"<br/>]          |
| `name`                                                 | *string*                                               | :heavy_minus_sign:                                     | The name of the application.                           | MyApp                                                  |
| `tier`                                                 | *string*                                               | :heavy_minus_sign:                                     | The tier of the application request.                   | frontend                                               |