# Principalappuser

Describes the optional principal information of the user of an application which
is being derived from a bearer token of a request.

## Example Usage

```typescript
import { Principalappuser } from "@acuvity/acuvity/models/components";

let value: Principalappuser = {
  email: "john.doe@acme.com",
  name: "John Doe",
  tokenValidated: false,
};
```

## Fields

| Field                                                                                                                 | Type                                                                                                                  | Required                                                                                                              | Description                                                                                                           | Example                                                                                                               |
| --------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `email`                                                                                                               | *string*                                                                                                              | :heavy_minus_sign:                                                                                                    | The Email address of the user. This will be derived from the email claims of a<br/>token like email, emailAddress or upn. | john.doe@acme.com                                                                                                     |
| `name`                                                                                                                | *string*                                                                                                              | :heavy_minus_sign:                                                                                                    | The given name of the user. This will be derived from the common name claims of<br/>a token like name or given_name.  | John Doe                                                                                                              |
| `tokenValidated`                                                                                                      | *boolean*                                                                                                             | :heavy_minus_sign:                                                                                                    | This will be true if the apex was able to validate the token in the request.                                          | false                                                                                                                 |