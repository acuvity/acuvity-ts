import { config } from "dotenv";
import { Acuvity, discoverApex } from "@acuvity/acuvity";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { Guard } from "@acuvity/acuvity";
import { GuardName } from "@acuvity/acuvity";

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));

const filePath = resolve(SCRIPT_DIR, "test_data", "pi-test.txt");
const configPath = resolve(SCRIPT_DIR, "configs", "simple_default_guard_config.yaml");

console.log("File Path:", filePath);
console.log("Config Path:", configPath);

config();


async function run_config() {
    const acuvity = new Acuvity(await discoverApex({
        security: {
            token: process.env.ACUVITY_TOKEN,
        },
    }));
    console.log("acuvity", acuvity);
    try {
        const result = await acuvity.apex.scan({
            files: filePath,
            messages: [
                "corporate sales number are 10k filling, in.abcd@gmail.com, 123abcd@yahoo.com hate you, 792-77-3459, 792-77-3453, 792-77-3454",
                "hello how are you?"
            ],
            guardConfig: configPath,
        });
        console.log("simple result", JSON.stringify(result.matches(), null, 2));
        console.log("msg ndex result", JSON.stringify(result.matches({ msgIndex: 1 }), null, 2));
        console.log("file index result", JSON.stringify(result.matches({ fileIndex: 0 }), null, 2));
    }
    catch (error) {
        console.error("Error while scanning:", error.message || error);
    }
}
run_config();
