# Principaluser

Describes the principal information of a user.

## Example Usage

```typescript
import { Principaluser } from "acuvity/models/components";

let value: Principaluser = {
  name: "user@company.com",
};
```

## Fields

| Field                                                                       | Type                                                                        | Required                                                                    | Description                                                                 | Example                                                                     |
| --------------------------------------------------------------------------- | --------------------------------------------------------------------------- | --------------------------------------------------------------------------- | --------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| `name`                                                                      | *string*                                                                    | :heavy_minus_sign:                                                          | Identification bit that will be used to identify the origin of the request. | user@company.com                                                            |