import { Acuvity, discoverApex } from "@acuvity/acuvity";
import { EXAMPLES } from "./examples"

let acuvity: Acuvity;


beforeAll(async () => {
    acuvity = new Acuvity(await discoverApex({
        security: {
            token: process.env['TEST_TOKEN'],
        },
    }));
});


describe('Apex tests', () => {
    test('Check no token error', async () => {
        await expect(async () => {
            const config = await discoverApex({
                security: {
                    token: process.env['NON_EXISTENT_TOKEN'],
                },
            });

            new Acuvity(config);
        }).rejects.toThrow("No token provided in security options. Did you forget to set the AppToken?");
    });

    test('Check scanrequest', async () => {
        const res = await acuvity.apex.scanRequest(
            {
                messages: [
                    EXAMPLES["keyword_detector"] ?? "",
                ],
                redactions: ["bluefin"],
                keywords: ["bluefin"],
                type: "Input"
            });
        expect(res.extractions?.[0]?.data).not.toContain("bluefin");
        expect(res.extractions?.[0]?.keywords).toHaveProperty("bluefin");

    });


    test('Check list analyzers', async () => {
        const res = await acuvity.apex.listAnalyzers();
        expect(Array.isArray(res)).toBe(true);
        expect(res.length).toBeGreaterThan(0);
    });

    test('Check list available guards', async () => {
        const res = await acuvity.apex.listAvailableGuards();
        expect(Array.isArray(res)).toBe(true);
        expect(res.length).toBeGreaterThan(0);
    });

    test('Check list detectable piis', async () => {
        const res = await acuvity.apex.listDetectablePIIs();
        expect(Array.isArray(res)).toBe(true);
        expect(res.length).toBeGreaterThan(0);
    });


    test('Check list detectable secrets', async () => {
        const res = await acuvity.apex.listDetectableSecrets();
        expect(Array.isArray(res)).toBe(true);
        expect(res.length).toBeGreaterThan(0);
    });


});