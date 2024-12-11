<!-- No SDK Example Usage [usage] -->
### Process a scan request

Now you can submit a scan request using the Scan API.

```typescript
import { Acuvity, discoverApex } from "@acuvity/acuvity";

async function run() {
  const acuvity = new Acuvity(await discoverApex({
    security: {
      token: process.env.ACUVITY_TOKEN,
    },
  }));

  const result = await acuvity.apex.scan({
    messages: ["Using a weather forecasting service, provide me with a weather forecast for the next ten days for Sunnyvale, CA."],
  });

  // Handle the result
  console.log(result);
}

run();

```

### List all available analyzers

Now you can list all available analyzers that can be used in the Scan API.

```typescript
import { Acuvity, discoverApex } from "@acuvity/acuvity";

async function run() {
  const acuvity = new Acuvity(await discoverApex({
    security: {
      token: process.env.ACUVITY_TOKEN,
    },
  }));

  const result = await acuvity.apex.listAnalyzers();

  // Handle the result
  console.log(result);
}

run();

```
<!-- No SDK Example Usage [usage] -->