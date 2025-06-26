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
  user: {
    email: "john.doe@acme.com",
    name: "John Doe",
    tokenValidated: false,
  },
};
```

## Fields

| Field                                                                                                                               | Type                                                                                                                                | Required                                                                                                                            | Description                                                                                                                         | Example                                                                                                                             |
| ----------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `component`                                                                                                                         | *string*                                                                                                                            | :heavy_minus_sign:                                                                                                                  | The component of the application request.                                                                                           | frontend                                                                                                                            |
| `labels`                                                                                                                            | *string*[]                                                                                                                          | :heavy_minus_sign:                                                                                                                  | The list of labels attached to an application request.                                                                              | [<br/>"country=us",<br/>"another-label"<br/>]                                                                                       |
| `name`                                                                                                                              | *string*                                                                                                                            | :heavy_minus_sign:                                                                                                                  | The name of the application.                                                                                                        | MyApp                                                                                                                               |
| `user`                                                                                                                              | [components.Principalappuser](../../models/components/principalappuser.md)                                                          | :heavy_minus_sign:                                                                                                                  | Describes the optional principal information of the user of an application which<br/>is being derived from a bearer token of a request. |                                                                                                                                     |