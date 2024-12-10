# Alertevent

Represents an alert event raised by a policy.

## Example Usage

```typescript
import { Alertevent } from "@acuvity/acuvity/models/components";

let value: Alertevent = {
  alertDefinition: "warning-notification",
  principal: {
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
  },
};
```

## Fields

| Field                                                                                         | Type                                                                                          | Required                                                                                      | Description                                                                                   | Example                                                                                       |
| --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `alertDefinition`                                                                             | *string*                                                                                      | :heavy_check_mark:                                                                            | The name of the alert definition that triggered the alert event.                              | warning-notification                                                                          |
| `alertDefinitionNamespace`                                                                    | *string*                                                                                      | :heavy_minus_sign:                                                                            | The namespace of the alert definition.                                                        |                                                                                               |
| `principal`                                                                                   | [components.Principal](../../models/components/principal.md)                                  | :heavy_check_mark:                                                                            | Describe the principal.                                                                       |                                                                                               |
| `provider`                                                                                    | *string*                                                                                      | :heavy_minus_sign:                                                                            | The provider used that the alert came from.                                                   |                                                                                               |
| `timestamp`                                                                                   | [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) | :heavy_minus_sign:                                                                            | When the alert event was raised.                                                              |                                                                                               |