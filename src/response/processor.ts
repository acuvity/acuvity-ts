import { GuardConfig, Guard } from "../guard/config.js";
import { Scanresponse } from "../models/components/scanresponse.js";
import { Extraction } from "../models/components/extraction.js";
import { ResponseHelper } from "./helper.js";
import { GuardMatch, ResponseMatch, Matches } from "./result.js";

/**
 * Processes scan responses against guard configurations to identify policy violations.
 *
 * Evaluates content extractions against defined guards and aggregates the results.
 * Handles both simple guards and complex match-based guards.
 */
export class ResponseProcessor {
    private guardConfig: GuardConfig;
    private response: Scanresponse;

    /**
     * Initialize with scan response and guard configuration.
     *
     * @param response The scan response containing content extractions
     * @param guardConfig Configuration defining guards and thresholds
     */
    constructor(response: Scanresponse, guardConfig: GuardConfig) {
        this.guardConfig = guardConfig;
        this.response = response;
    }

    /**
     * Base method to evaluate a guard against an extraction.
     * Delegates the actual evaluation to ResponseHelper.
     *
     * @param guard Guard configuration to evaluate
     * @param extraction Content extraction to check
     * @param matchName Optional specific pattern to match
     * @returns GuardMatch with evaluation results
     */
    private processGuardCheck(
        guard: Guard,
        extraction: Extraction,
        matchName?: string
    ): GuardMatch {
        const helper = new ResponseHelper();
        return helper.evaluate(extraction, guard, matchName);
    }

    /**
     * Process a simple guard with no specific patterns to match.
     *
     * @param guard The guard configuration
     * @param extraction Content extraction to check
     * @returns GuardMatch with evaluation results
     */
    private processSimpleGuard(guard: Guard, extraction: Extraction): GuardMatch {
        return this.processGuardCheck(guard, extraction);
    }

    /**
     * Process a complex guard with specific patterns to match.
     * Aggregates results from multiple pattern checks based on thresholds.
     *
     * @param guard The guard configuration with match patterns
     * @param extraction Content extraction to check
     * @returns GuardMatch with aggregated evaluation results
     */
    private processMatchGuard(guard: Guard, extraction: Extraction): GuardMatch {
        let matchCounter = 0
        let resultMatch = ResponseMatch.NO
        let matchList: string[] = []

        // Check each specific pattern defined in the guard
        for (const [matchName, matchNameGuard] of Object.entries(guard.matches)) {
            const result = this.processGuardCheck(guard, extraction, matchName)

            // Track matches that exceed their individual thresholds
            if (result.responseMatch == ResponseMatch.YES &&
                result.matchCount != undefined &&
                result.matchCount >= matchNameGuard.countThreshold) {
                matchCounter += result.matchCount
                if (result.matchValues) {
                    matchList.push(matchName)
                }

                // If total matches exceed the guard's overall threshold, flag as a match
                if (matchCounter >= guard.countThreshold) {
                    resultMatch = ResponseMatch.YES
                }
            }
        }

        // Only keep match list if there was an overall match
        if (resultMatch === ResponseMatch.NO) {
            matchList = []
        }

        console.debug(
            "match guard %s, check %s, total match %s, guard threshold %s, match values %s",
            guard.name.toString(),
            resultMatch,
            matchCounter,
            guard.threshold.toString(),
            matchList
        );

        return {
            responseMatch: resultMatch,
            guardName: guard.name,
            threshold: guard.threshold.toString(),
            actualValue: 1.0,  // Always 1.0 for aggregated matches
            matchCount: matchCounter,
            matchValues: matchList
        }
    }

    /**
     * Process all guards against all extractions in the response.
     *
     * Processes simple guards and match-based guards separately, then
     * aggregates results into a list of Matches objects.
     *
     * @returns List of Matches objects, one per extraction
     * @throws Error if response is missing extractions or processing fails
     */
    public matches(): Matches[] {
        const allMatches: Matches[] = [];

        try {
            if (!this.response.extractions) {
                throw new Error("response doesn't contain extractions");
            }

            // Process each extraction separately
            for (const ext of this.response.extractions) {
                if (!ext.data) continue;

                const matchedChecks: GuardMatch[] = [];  // Guards that matched (violations)
                const allChecks: GuardMatch[] = [];      // All guard checks performed

                // Process simple guards (no specific patterns)
                for (const guard of this.guardConfig.getSimpleGuards) {
                    const result = this.processSimpleGuard(guard, ext);
                    if (result.responseMatch === ResponseMatch.YES) {
                        matchedChecks.push(result);
                    }
                    allChecks.push(result);
                }

                // Process complex guards (with specific patterns)
                for (const guard of this.guardConfig.getMatchGuards) {
                    const result = this.processMatchGuard(guard, ext);
                    if (result.responseMatch === ResponseMatch.YES) {
                        matchedChecks.push(result);
                    }
                    allChecks.push(result)
                }

                // Create Matches object for this extraction's results
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
