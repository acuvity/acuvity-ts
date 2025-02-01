import { config } from "dotenv";
import { Acuvity, discoverApex } from "@acuvity/acuvity";

// Detect environment
const isNode = typeof process !== 'undefined' && process.versions?.node;

// Helper function to create temporary file with content
async function createTempFile(content) {
    if (typeof Deno !== "undefined") {
        // Deno implementation
        const tempDir = await Deno.makeTempDir();
        const tempFilePath = `${tempDir}/temp-${crypto.randomUUID()}`;

        await Deno.writeTextFile(tempFilePath, content);
        return tempFilePath;
    } else {
        // Node.js implementation
        const { writeFile } = await import('fs/promises');
        const { tmpdir } = await import('os');
        const { join } = await import('path');
        const { randomBytes } = await import('crypto');

        const tempDir = tmpdir();
        const tempFileName = `temp-${randomBytes(6).toString('hex')}`;
        const tempFilePath = join(tempDir, tempFileName);

        await writeFile(tempFilePath, content, 'utf8');
        return tempFilePath;
    }
}

async function deleteTempFile(path) {
    if (typeof Deno !== "undefined") {
        await Deno.remove(path);
    } else {
        const { unlink } = await import('fs/promises');
        await unlink(path);
    }
}

// Simple default guard config content
const simpleConfigContent = `guardrails:
  - name: prompt_injection
  - name: toxic
  - name: jailbreak
  - name: biased
  - name: harmful
  - name: modality
  - name: language
  - name: pii_detector
  - name: secrets_detector
  - name: malicious_url`;

async function run() {
    if (isNode) {
        config(); // Load .env for Node.js
    }

    const acuvity = new Acuvity(await discoverApex({
        security: {
            token: isNode ? process.env.ACUVITY_TOKEN : Deno.env.get("ACUVITY_TOKEN"),
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

async function run_config() {
    if (isNode) {
        config(); // Load .env for Node.js
    }

    let configPath;

    try {
        // Create temporary config file
        configPath = await createTempFile(simpleConfigContent);
        console.log("Config Path:", configPath);

        const acuvity = new Acuvity(await discoverApex({
            security: {
                token: isNode ? process.env.ACUVITY_TOKEN : Deno.env.get("ACUVITY_TOKEN"),
            },
        }));
        console.log("acuvity", acuvity);

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
    finally {
        // Clean up temporary file
        if (configPath) {
            try {
                await deleteTempFile(configPath);
            } catch (error) {
                console.error("Error cleaning up temporary file:", error.message || error);
            }
        }
    }
}

// Run both functions
await run();
await run_config();
