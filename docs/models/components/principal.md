# Principal

Describe the principal.

## Example Usage

```typescript
import { Principal } from "@acuvity/acuvity/models/components";

let value: Principal = {
  ip: "192.0.2.42",
  app: {
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
  },
  teams: [
    "admins",
  ],
  tokenName: "my-user-token",
  type: "User",
  user: {
    name: "user@company.com",
  },
};
```

## Fields

| Field                                                                | Type                                                                 | Required                                                             | Description                                                          | Example                                                              |
| -------------------------------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `ip`                                                                 | *string*                                                             | :heavy_minus_sign:                                                   | The source IP address of the request.                                | 192.0.2.42                                                           |
| `app`                                                                | [components.Principalapp](../../models/components/principalapp.md)   | :heavy_minus_sign:                                                   | Describes the principal information of an application.               |                                                                      |
| `authType`                                                           | [components.AuthType](../../models/components/authtype.md)           | :heavy_minus_sign:                                                   | The type of authentication.                                          |                                                                      |
| `claims`                                                             | *string*[]                                                           | :heavy_minus_sign:                                                   | List of claims extracted from the user query.                        |                                                                      |
| `teams`                                                              | *string*[]                                                           | :heavy_minus_sign:                                                   | The teams that were used to authorize the request.                   | admins                                                               |
| `tokenName`                                                          | *string*                                                             | :heavy_minus_sign:                                                   | The name of the token, if any.                                       | my-user-token                                                        |
| `type`                                                               | [components.PrincipalType](../../models/components/principaltype.md) | :heavy_check_mark:                                                   | The type of principal.                                               | [<br/>"User"<br/>]                                                   |
| `user`                                                               | [components.Principaluser](../../models/components/principaluser.md) | :heavy_minus_sign:                                                   | Describes the principal information of a user.                       |                                                                      |