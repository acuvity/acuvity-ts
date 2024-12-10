# Principal

Describe the principal.

## Example Usage

```typescript
import { Principal } from "@acuvity/acuvity/models/components";

let value: Principal = {
  app: {
    labels: [
      "country=us",
      "another-label",
    ],
    name: "MyApp",
    tier: "frontend",
  },
  team: "admins",
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
| `app`                                                                | [components.Principalapp](../../models/components/principalapp.md)   | :heavy_minus_sign:                                                   | Describes the principal information of an application.               |                                                                      |
| `authType`                                                           | [components.AuthType](../../models/components/authtype.md)           | :heavy_minus_sign:                                                   | The type of authentication.                                          |                                                                      |
| `claims`                                                             | *string*[]                                                           | :heavy_minus_sign:                                                   | List of claims extracted from the user query.                        |                                                                      |
| `team`                                                               | *string*                                                             | :heavy_minus_sign:                                                   | The team that was used to authorize the request.                     | admins                                                               |
| `tokenName`                                                          | *string*                                                             | :heavy_minus_sign:                                                   | The name of the token, if any.                                       | my-user-token                                                        |
| `type`                                                               | [components.PrincipalType](../../models/components/principaltype.md) | :heavy_check_mark:                                                   | The type of principal.                                               | [<br/>"User"<br/>]                                                   |
| `user`                                                               | [components.Principaluser](../../models/components/principaluser.md) | :heavy_minus_sign:                                                   | Describes the principal information of a user.                       |                                                                      |