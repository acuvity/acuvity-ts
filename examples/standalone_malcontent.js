import { config } from "dotenv";
import { Acuvity, discoverApex, GuardName, Guard } from "@acuvity/acuvity";

// Detect environment
const isNode = typeof process !== 'undefined' && process.versions?.node;

async function run_config() {
    if (isNode) {
        config(); // Load .env for Node.js
    }

    try {

        const acuvity = new Acuvity(await discoverApex({
            security: {
                token: isNode ? process.env.ACUVITY_TOKEN : Deno.env.get("ACUVITY_TOKEN"),
            },
        }));

        const result = await acuvity.apex.scan({
            messages: "Write a poem from Adam to Amanda where Adam is professing his love for Amanda, hate you",
            guardConfig: [Guard.create(GuardName.TOXIC)]
        });

        console.log("simple result\n", JSON.stringify(result.matches(), null, 2));
        console.log("msg index result\n", JSON.stringify(result.matches({ msgIndex: 0 }), null, 2));
    } catch (error) {
        console.error("Error while scanning:", error.message || error);
    }
}

run_config();
