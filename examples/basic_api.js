import { config } from "dotenv";
import { Acuvity, discoverApex } from "@acuvity/acuvity";

import { dirname, resolve } from "path";
import { getFileURLImport } from "./utils.js";

// Get the current script directory
const fileURLImport = await getFileURLImport();
const SCRIPT_DIR = dirname(fileURLImport(import.meta.url))

const filePath = resolve(SCRIPT_DIR, "test_data", "pi-test.txt");
const configPath = resolve(SCRIPT_DIR, "configs", "simple_default_guard_config.yaml");

console.log("File Path:", filePath);
console.log("Config Path:", configPath);

config();
async function run() {
    const acuvity = new Acuvity(await discoverApex({
        security: {
            token: process.env.ACUVITY_TOKEN,
        },
    }));
    console.log("acuvity", acuvity);
    try {
        const guardNames = await acuvity.apex.listAvailableGuards()
        console.log("\n acuvity guardnames: \n", guardNames)
        const secretsNames = await acuvity.apex.listDetectableSecrets()
        console.log("\n acuvity secrets: \n", secretsNames)
        const piisNames = await acuvity.apex.listDetectablePIIs()
        console.log("\n acuvity piis: \n", piisNames)
    }
    catch (error) {
        console.error("Error while scanning:", error.message || error);
    }
}
run();
