import { GuardConfig, Guard } from "../guard/config.js";
import { Scanresponse } from "../models/components/scanresponse.js";
import { Extraction } from "../models/components/extraction.js";
import { ResponseHelper } from "./helper.js";
import { GuardMatch, ResponseMatch, Matches } from "./result.js";

export class ResponseProcessor {
    private guardConfig: GuardConfig;
    private response: Scanresponse;  // We need to define this interface

    constructor(response: Scanresponse, guardConfig: GuardConfig) {
        this.guardConfig = guardConfig;
        this.response = response;
    }

    private processGuardCheck(
        guard: Guard,
        extraction: Extraction,
        matchName?: string
    ): GuardMatch {
        const helper = new ResponseHelper();
        return helper.evaluate(extraction, guard, matchName);
    }

    private processSimpleGuard(guard: Guard, extraction: Extraction): GuardMatch {
        return this.processGuardCheck(guard, extraction);
    }

    public matches(): Matches[] {
        const allMatches: Matches[] = [];

        try {
            if (!this.response.extractions) {
                throw new Error("response doesn't contain extractions");
            }

            for (const ext of this.response.extractions) {
                if (!ext.data) continue;

                const matchedChecks: GuardMatch[] = [];
                const allChecks: GuardMatch[] = [];

                // Handle simple guards
                for (const guard of this.guardConfig.simple_guards) {
                    const result = this.processSimpleGuard(guard, ext);
                    if (result.responseMatch === ResponseMatch.YES) {
                        matchedChecks.push(result);
                    }
                    allChecks.push(result);
                }

                // We'll add match guards handling later

                const singleMatch: Matches = {
                    inputData: ext.data,
                    responseMatch: matchedChecks.length > 0 ? ResponseMatch.YES : ResponseMatch.NO,
                    matchedChecks: matchedChecks,
                    allChecks: allChecks
                };

                allMatches.push(singleMatch);
            }

            return allMatches;

        } catch (e) {
            throw new Error(`Failed to process guard configuration: ${e instanceof Error ? e.message : String(e)}`);
        }
    }

}
