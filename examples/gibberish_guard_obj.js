import { config } from "dotenv";
import { Acuvity, discoverApex } from "@acuvity/acuvity";
import { Guard } from "@acuvity/acuvity";
import { GuardName } from "@acuvity/acuvity";

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
                "hjasdgfabfjkfabfkjabfajkbfkjbfjkbafhbajfjkuf",
            ],
            guardConfig: [Guard.create(GuardName.LANGUAGE)],
        });
        console.log("result", JSON.stringify(result.matches(), null, 2));
    }
    catch (error) {
        console.error("Error while scanning:", error.message || error);
    }
}
run();
