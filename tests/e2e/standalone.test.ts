import { discoverApex } from "@acuvity/acuvity";
import { AcuvityCore } from "@acuvity/acuvity/core.js";
import { apexListAnalyzers } from "@acuvity/acuvity/funcs/apexListAnalyzers.js";
import { apexScanRequest } from "@acuvity/acuvity/funcs/apexScanRequest.js";
import { EXAMPLES } from "./examples";

let client: AcuvityCore;
beforeAll(async () => {
  client = new AcuvityCore(
    await discoverApex({
      security: {
        token: process.env["TEST_TOKEN"],
      },
    }),
  );
});

describe("Standalone fucntion tests", () => {
  test("Check apexListAnalyzers", async () => {
    const result = await apexListAnalyzers(client);
    console.log(result);
    expect(result.ok).toBe(true);
    expect(Array.isArray(result.value)).toBe(true);
  });

  test("Check no apexScanRequest", async () => {
    const result = await apexScanRequest(client, {
      messages: [EXAMPLES["prompt_injection"] ?? ""],
      type: "Input",
    });
    console.log(result.value?.summary?.exploits);
    expect(result.value?.summary?.exploits).toHaveProperty("prompt_injection");
    expect(result.ok).toBe(true);
  });
});
