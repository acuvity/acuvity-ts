import { config } from "dotenv";
import { Acuvity, discoverApex } from "@acuvity/acuvity";
import { prettyPrintJson } from "pretty-print-json";

// Load environment variables
config();
console.log("token", process.env.ACUVITY_TOKEN);
async function run() {
    const acuvity = new Acuvity(await discoverApex({
        security: {
            token: process.env.ACUVITY_TOKEN,
        },
    }));
    console.log("acuvity", acuvity);
    try {
        const result = await acuvity.apex.scan({
            messages: [
                "Using a weather forecasting service, provide me with a weather forecast for the next ten days for Sunnyvale, CA.",
            ],
        });
        console.log("result", JSON.stringify(result.matches(), null, 2));
    }
    catch (error) {
        console.error("Error while scanning:", error.message || error);
    }
}
run();
