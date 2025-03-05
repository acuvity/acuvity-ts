# Principalapp

Describes the principal information of an application.

## Example Usage

```typescript
import { Principalapp } from "@acuvity/acuvity/models/components";

let value: Principalapp = {
  component: "frontend",
  labels: [
    "country=us",
    "another-label",
  ],
  name: "MyApp",
};
```

## Fields

| Field                                                  | Type                                                   | Required                                               | Description                                            | Example                                                |
| ------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------ |
| `component`                                            | *string*                                               | :heavy_minus_sign:                                     | The component of the application request.              | frontend                                               |
| `labels`                                               | *string*[]                                             | :heavy_minus_sign:                                     | The list of labels attached to an application request. | [<br/>"country=us",<br/>"another-label"<br/>]          |
| `name`                                                 | *string*                                               | :heavy_minus_sign:                                     | The name of the application.                           | MyApp                                                  |