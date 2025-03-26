import { Acuvity, discoverApex, Guard, Match } from "@acuvity/acuvity";
import { EXAMPLES } from "./examples";

describe("Guardrail tests", () => {
  let acuvity: Acuvity;
  let guards: string[];
  let matchGuardJson: any;
  let matchGuardList: Guard[];

  beforeAll(async () => {
    acuvity = new Acuvity(
      await discoverApex({
        security: {
          token: process.env["TEST_TOKEN"],
        },
      }),
    );
    guards = await acuvity.apex.listAvailableGuards();
    matchGuardList = [
      Guard.create(
        "pii_detector",
        {
          money_amount: Match.create("0", false, 1),
          email_address: Match.create("0", false, 1),
        },
        "0",
        2,
      ),
      Guard.create(
        "keyword_detector",
        {
          bluefin: Match.create("0", false, 1),
          apollo: Match.create("0", false, 1),
        },
        "0",
        2,
      ),
      Guard.create(
        "secrets_detector",
        {
          credentials: Match.create("0", false, 1),
          aws_secret_key: Match.create("0", false, 1),
        },
        "0",
        2,
      ),
    ];
    matchGuardJson = {
      guardrails: [
        {
          name: "pii_detector",
          count_threshold: 2,
          matches: {
            money_amount: { count_threshold: 1 },
            email_address: { count_threshold: 1, redact: true },
          },
        },
        {
          name: "keyword_detector",
          count_threshold: 2,
          matches: {
            bluefin: { count_threshold: 1 },
            apollo: { count_threshold: 1, redact: true },
          },
        },
        {
          name: "secrets_detector",
          count_threshold: 2,
          matches: {
            credentials: { count_threshold: 1 },
            aws_secret_key: { count_threshold: 1 },
          },
        },
      ],
    };
  });

  test("Check each detector with json and Guard instance", async () => {
    for (const guard of guards) {
      if (guard === "biased") {
        continue;
      }

      const threshold = guard !== "modality" ? "> 0.1" : "0";
      let guardList: Guard[], guardJson: object;
      if (guard !== "keyword_detector") {
        guardList = [Guard.create(guard, null, threshold, 0)];
        guardJson = {
          guardrails: [
            {
              name: guard,
              threshold: threshold,
            },
          ],
        };
      } else {
        guardList = [
          Guard.create(guard, { bluefin: Match.create() }, threshold),
        ];
        guardJson = {
          guardrails: [
            {
              name: guard,
              threshold: threshold,
              matches: { bluefin: {} },
            },
          ],
        };
      }
      const resGuard = await acuvity.apex.scan({
        messages: EXAMPLES[guard],
        guardConfig: guardList,
      });
      const resJson = await acuvity.apex.scan({
        messages: EXAMPLES[guard],
        guardConfig: guardJson,
      });
      expect(
        resGuard.matches()[0]?.matchedChecks[0]?.guardName.toString(),
      ).toBe(guard);
      expect(resJson.matches()[0]?.matchedChecks[0]?.guardName.toString()).toBe(
        guard,
      );
    }
  }, 10000);

  describe.each([
    ["pii_detector", "multiple_pii_detector"],
    ["secrets_detector", "multiple_secrets_detector"],
    ["keyword_detector", "multiple_keyword_detector"],
  ])("%s Test", (guard, example) => {
    test(`Check ${guard} positive match`, async () => {
      for (const usedConfig of [matchGuardJson, matchGuardList]) {
        const res = await acuvity.apex.scan({
          messages: EXAMPLES[example],
          guardConfig: usedConfig,
        });
        expect(res.matches()[0]?.matchedChecks[0]?.guardName.toString()).toBe(
          guard,
        );
        expect(res.matches()[0]?.matchedChecks[0]?.matchCount).toBe(2);
      }
    });
  });

  describe.each([
    ["pii_detector", "multiple_pii_detector", 0, "money_amount"],
    ["secrets_detector", "multiple_secrets_detector", 2, "credentials"],
    ["keyword_detector", "multiple_keyword_detector", 1, "bluefin"],
  ])("%s Test", (guard, example, order, matchName) => {
    test(`Check ${guard} negative match`, async () => {
      matchGuardJson["guardrails"][order]["matches"][matchName][
        "count_threshold"
      ] = 2;
      (matchGuardList[order]?.matches ?? {})[matchName] = Match.create(
        "0",
        false,
        2,
      );
      for (const usedConfig of [matchGuardJson, matchGuardList]) {
        const res = await acuvity.apex.scan({
          messages: EXAMPLES[example],
          guardConfig: usedConfig,
        });
        expect(res.matches()[0]?.matchedChecks[0]?.guardName.toString()).toBe(
          undefined,
        );
      }
    });
  });

  test("Check keywords and redactions", async () => {
    const prompt = EXAMPLES["keywords_and_pii"];
    const res = await acuvity.apex.scan({
      messages: prompt,
      guardConfig: matchGuardJson,
    });
    matchGuardJson["guardrails"][1]["matches"]["apollo"]["count_threshold"] = 2;
    const expectedData = prompt
      ?.replace(/apollo/g, "######")
      .replace(/aaa@gmail.com/g, "#############");
    expect(res.matches()[0]?.inputData).toBe(expectedData);
  });
});
