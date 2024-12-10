<!-- Start SDK Example Usage [usage] -->
### Process a scan request

Now you can submit a scan request using the Scan API.

```typescript
import { Acuvity } from "acuvity";

const acuvity = new Acuvity({
  security: {
    token: "<YOUR_BEARER_TOKEN_HERE>",
  },
});

async function run() {
  const result = await acuvity.apex.scan({
    bypassHash: "Alice",
    user: {
      claims: [
        "@org=acuvity.ai",
        "given_name=John",
        "family_name=Doe",
      ],
      name: "Alice",
    },
  });

  // Handle the result
  console.log(result);
}

run();

```

### List all available analyzers

Now you can list all available analyzers that can be used in the Scan API.

```typescript
import { Acuvity } from "acuvity";

const acuvity = new Acuvity({
  security: {
    token: "<YOUR_BEARER_TOKEN_HERE>",
  },
});

async function run() {
  const result = await acuvity.apex.listAnalyzers();

  // Handle the result
  console.log(result);
}

run();

```
<!-- End SDK Example Usage [usage] -->