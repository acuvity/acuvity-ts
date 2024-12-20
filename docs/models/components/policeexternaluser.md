# Policeexternaluser

PoliceExternalUser holds the information about the remote user for a
PoliceRequest.

## Example Usage

```typescript
import { Policeexternaluser } from "@acuvity/acuvity/models/components";

let value: Policeexternaluser = {
  claims: [
    "@org=acuvity.ai",
    "given_name=John",
    "family_name=Doe",
  ],
  name: "John Doe",
};
```

## Fields

| Field                                                       | Type                                                        | Required                                                    | Description                                                 | Example                                                     |
| ----------------------------------------------------------- | ----------------------------------------------------------- | ----------------------------------------------------------- | ----------------------------------------------------------- | ----------------------------------------------------------- |
| `claims`                                                    | *string*[]                                                  | :heavy_check_mark:                                          | List of claims extracted from the user query.               | [<br/>"@org=acuvity.ai",<br/>"given_name=John",<br/>"family_name=Doe"<br/>] |
| `name`                                                      | *string*                                                    | :heavy_check_mark:                                          | The name of the external user.                              | John Doe                                                    |