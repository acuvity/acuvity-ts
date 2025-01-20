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

    private processMatchGuard(guard: Guard, extraction: Extraction): GuardMatch {
        let matchCounter = 0
        let resultMatch = ResponseMatch.NO
        for (const [matchName, matchNameGuard] of Object.entries(guard.matches)) {
            const result = this.processGuardCheck(guard, extraction, matchName)

            if (result.responseMatch == ResponseMatch.YES &&
                result.matchCount != undefined &&
                result.matchCount >= matchNameGuard.count_threshold) {
                matchCounter += result.matchCount
            }

            if (matchCounter >= guard.count_threshold) {
                resultMatch = ResponseMatch.YES
            }
        }

        console.debug(
            "match guard %s, check %s, total match %s, guard threshold %s",
            guard.name.toString(),
            resultMatch,
            matchCounter,
            guard.threshold.toString()
        );

        return {
            responseMatch: resultMatch,
            guardName: guard.name,
            threshold: guard.threshold.toString(),
            actualValue: 1.0,
            matchCount: matchCounter
        }
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

                for (const guard of this.guardConfig.match_guards) {
                    const result = this.processMatchGuard(guard, ext);
                    if (result.responseMatch === ResponseMatch.YES) {
                        matchedChecks.push(result);
                    }
                    allChecks.push(result)
                }

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
