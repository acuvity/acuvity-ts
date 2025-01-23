import { load } from "https://deno.land/std@0.193.0/dotenv/mod.ts";
import { Acuvity, discoverApex } from "../src/index.ts";
import { dirname, resolve, fromFileUrl } from "https://deno.land/std@0.193.0/path/mod.ts";

// Load environment variables from a .env file
await load();

// Get the current script directory
const SCRIPT_DIR = dirname(fromFileUrl(import.meta.url));

// Resolve file paths
const filePath = resolve(SCRIPT_DIR, "test_data", "pi-test.txt");
const configPath = resolve(SCRIPT_DIR, "configs", "simple_default_guard_config.yaml");

console.log("File Path:", filePath);
console.log("Config Path:", configPath);

async function run() {
    const acuvity = new Acuvity(await discoverApex({
        security: {
            token: Deno.env.get("ACUVITY_TOKEN"), // Access the token from the environment
        },
    }));

    console.log("acuvity", acuvity);

    try {
        const result = await acuvity.apex.scan({
            messages: [
                "corporate sales number are 10k filling, in.abcd@gmail.com, 123abcd@yahoo.com hate you, 792-77-3459, 792-77-3453, 792-77-3454",
            ],
            files: filePath,
        });

        console.log("result", JSON.stringify(result.matches(), null, 2));
    } catch (error) {
        console.error("Error while scanning:", error.message || error);
    }
}

run();
