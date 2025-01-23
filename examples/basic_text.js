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
        const result = await acuvity.apex.scan({
            messages: [
                "corporate sales number are 10k filling, in.abcd@gmail.com, 123abcd@yahoo.com hate you, 792-77-3459, 792-77-3453, 792-77-3454",
            ],
        });
        console.log("result\n", JSON.stringify(result.matches(), null, 2));
    }
    catch (error) {
        console.error("Error while scanning:", error.message || error);
    }
}
run();

async function run_config() {
    const acuvity = new Acuvity(await discoverApex({
        security: {
            token: process.env.ACUVITY_TOKEN,
        },
    }));
    console.log("acuvity", acuvity);
    try {
        const result = await acuvity.apex.scan({
            messages: [
                "corporate sales number are 10k filling, in.abcd@gmail.com, 123abcd@yahoo.com hate you, 792-77-3459, 792-77-3453, 792-77-3454",
            ],
            guardConfig: configPath,
        });
        console.log("result", JSON.stringify(result.matches(), null, 2));
    }
    catch (error) {
        console.error("Error while scanning:", error.message || error);
    }
}
run_config();
