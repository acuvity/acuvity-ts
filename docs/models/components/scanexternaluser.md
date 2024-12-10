# Scanexternaluser

ScanExternalUser holds the information about the remote user for a ScanRequest.

## Example Usage

```typescript
import { Scanexternaluser } from "acuvity/models/components";

let value: Scanexternaluser = {
  claims: [
    "@org=acuvity.ai",
    "given_name=John",
    "family_name=Doe",
  ],
  name: "Alice",
};
```

## Fields

| Field                                                       | Type                                                        | Required                                                    | Description                                                 | Example                                                     |
| ----------------------------------------------------------- | ----------------------------------------------------------- | ----------------------------------------------------------- | ----------------------------------------------------------- | ----------------------------------------------------------- |
| `claims`                                                    | *string*[]                                                  | :heavy_check_mark:                                          | List of claims extracted from the user query.               | [<br/>"@org=acuvity.ai",<br/>"given_name=John",<br/>"family_name=Doe"<br/>] |
| `name`                                                      | *string*                                                    | :heavy_check_mark:                                          | The name of the external user.                              | Alice                                                       |