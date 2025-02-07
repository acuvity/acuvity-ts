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

// PII Guard config content
const malContentConfigContent = `guardrails:
  - name: toxic`;

// Test file content
const testContent = `Write a poem from Adam to Amanda where Adam is professing his love for Amanda, hate you`;

async function run_config() {
    if (isNode) {
        config(); // Load .env for Node.js
    }

    let configPath;
    let testFilePath;

    try {
        // Create temporary files
        configPath = await createTempFile(malContentConfigContent);
        testFilePath = await createTempFile(testContent);

        console.log("Config Path:", configPath);
        console.log("Test File Path:", testFilePath);

        const acuvity = new Acuvity(await discoverApex({
            security: {
                token: isNode ? process.env.ACUVITY_TOKEN : Deno.env.get("ACUVITY_TOKEN"),
            },
        }));

        const result = await acuvity.apex.scan({
            files: testFilePath,
            guardConfig: configPath,
        });

        console.log("simple result\n", JSON.stringify(result.matches(), null, 2));
        console.log("msg index result\n", JSON.stringify(result.matches({ msgIndex: 1 }), null, 2));
        console.log("file index result\n", JSON.stringify(result.matches({ fileIndex: 0 }), null, 2));
    } catch (error) {
        console.error("Error while scanning:", error.message || error);
    } finally {
        // Clean up temporary files
        if (configPath || testFilePath) {
            try {
                if (configPath) await deleteTempFile(configPath);
                if (testFilePath) await deleteTempFile(testFilePath);
            } catch (error) {
                console.error("Error cleaning up temporary files:", error.message || error);
            }
        }
    }
}

run_config();
