import { GuardName } from "../guard/constants.js";
import {
    Guard
} from "../guard/config.js";
import { GuardMatch, ResponseMatch } from "./result.js";
import { Extraction } from "../models/components/extraction.js";
import { Textualdetection, TextualdetectionType } from "../models/components/textualdetection.js";

/**
 * Evaluates content extractions against various types of security guards.
 * Provides methods to check content for violations such as prompt injections,
 * harmful content, PII, secrets, and custom keywords.
 */
export class ResponseHelper {
    /**
     * Evaluates an extraction against a specific guard configuration.
     *
     * @param extraction Content extraction to evaluate
     * @param guard Guard configuration defining what to check and thresholds
     * @param matchName Optional specific pattern/entity to match
     * @returns GuardMatch object with evaluation results
     */
    public evaluate(
        extraction: Extraction,
        guard: Guard,
        matchName?: string
    ): GuardMatch {
        let exists = false;
        let value = 0.0;
        let matchCount = 0;
        let matchValues: string[] = [];

        try {
            // Security-related threats (prompt injection, jailbreak attempts)
            if (guard.name.equals(GuardName.PROMPT_INJECTION) ||
                guard.name.equals(GuardName.JAIL_BREAK) ||
                guard.name.equals(GuardName.MALICIOUS_URL)) {
                [exists, value] = this.getGuardValue(extraction.exploits, guard.name.toString());
            }
            // Content quality/safety checks
            else if (guard.name.equals(GuardName.TOXIC) ||
                guard.name.equals(GuardName.BIASED) ||
                guard.name.equals(GuardName.HARMFUL_CONTENT)) {
                [exists, value] = this.getGuardValue(extraction.malcontents, guard.name.toString());
            }
            // Content modality detection (text, image, etc.)
            else if (guard.name.equals(GuardName.MODALITY)) {
                exists = this.getModalityValue(extraction, guard, matchName);
            }
            // Language detection - check specific language or any language
            else if (guard.name.equals(GuardName.LANGUAGE)) {
                if (matchName) {
                    [exists, value] = this.getGuardValue(extraction.languages, matchName);
                } else if (extraction.languages) {
                    exists = Object.keys(extraction.languages).length > 0;
                    value = 1.0;
                }
            }
            // Check for Personal Identifiable Information
            else if (guard.name.equals(GuardName.PII_DETECTOR)) {
                [exists, value, matchCount, matchValues] = this.getTextDetectionsType(
                    extraction.piIs,
                    guard,
                    TextualdetectionType.Pii,
                    extraction.detections,
                    matchName
                );
            }
            // Check for sensitive secrets (API keys, passwords, etc.)
            else if (guard.name.equals(GuardName.SECRETS_DETECTOR)) {
                [exists, value, matchCount, matchValues] = this.getTextDetectionsType(
                    extraction.secrets,
                    guard,
                    TextualdetectionType.Secret,
                    extraction.detections,
                    matchName
                );
            }
            // Check for custom keywords/patterns
            else if (guard.name.equals(GuardName.KEYWORD_DETECTOR)) {
                [exists, value, matchCount, matchValues] = this.getTextDetectionsType(
                    extraction.keywords,
                    guard,
                    TextualdetectionType.Keyword,
                    extraction.detections,
                    matchName
                );
            }

            // Determine if guard check passed based on threshold configuration
            const responseMatch = exists && guard.threshold.compare(value)
                ? ResponseMatch.YES
                : ResponseMatch.NO;

            return {
                responseMatch,
                guardName: guard.name,
                threshold: guard.threshold.toString(),
                actualValue: value,
                matchCount,
                matchValues
            };

        } catch (e) {
            throw new Error(`Error in evaluation: ${e instanceof Error ? e.message : String(e)}`);
        }
    }

    /**
     * Extracts a guard value from a dictionary of scores.
     *
     * @param lookup Dictionary of scores keyed by guard name
     * @param key Guard name to look for
     * @returns Tuple of [exists, score] where exists is true if match found
     */
    private getGuardValue(
        lookup: Record<string, number> | undefined,
        key: string,
    ): [boolean, number] {
        if (!lookup || !lookup[key]) {
            return [false, 0]
        }

        return [true, lookup[key]];
    }

    /**
     * Processes text-based detections (PII, secrets, keywords).
     *
     * Handles both specific pattern matching (when matchName provided)
     * and general detection reporting.
     *
     * @param lookup Dictionary of scores keyed by detection name
     * @param guard Guard configuration with thresholds
     * @param detectionType Type of detection to filter for
     * @param detections List of all textual detections
     * @param matchName Optional specific detection to look for
     * @returns Tuple of [exists, score, count, matchValues]
     */
    private getTextDetectionsType(
        lookup: Record<string, number> | undefined,
        guard: Guard,
        detectionType: TextualdetectionType,
        detections: Textualdetection[] | undefined,
        matchName?: string
    ): [exists: boolean, value: number, matchCount: number, matchValues: string[]] {
        if (matchName) {
            // Looking for a specific pattern/entity
            if (!detections) {
                return [false, 0, 0, []];
            }

            // Find all matching detections that exceed the threshold
            const textMatches = detections
                .filter((d): d is Textualdetection & { score: number } =>
                    d.type === detectionType &&
                    d.name === matchName &&
                    d.score !== null &&
                    typeof d.score === 'number' &&
                    guard.threshold.compare(d.score)
                )
                .map(d => d.score);

            const count = textMatches.length;

            // If no textual detections found, check lookup dictionary as fallback
            if (count === 0 && lookup && matchName in lookup) {
                const lookupValue = lookup[matchName];
                if (typeof lookupValue === 'number') {
                    return [true, lookupValue, 1, [matchName]]
                }
            }

            if (count === 0) {
                return [false, 0, 0, []];
            }

            // Return highest confidence score if multiple matches
            const maxScore = textMatches.length > 0 ? Math.max(...textMatches) : 0;
            return [true, maxScore, count, [matchName]];
        }

        // No specific match requested - return all matches for this detection type
        const exists = !!lookup && Object.keys(lookup).length > 0;
        return [
            exists,
            exists ? 1.0 : 0.0,
            lookup ? Object.keys(lookup).length : 0,
            lookup ? Object.keys(lookup) : []
        ];
    }

    /**
     * Checks if specific or any content modality exists in the extraction.
     *
     * @param extraction The content extraction to check
     * @param _ Guard configuration (unused but kept for consistency)
     * @param matchName Optional specific modality to look for
     * @returns Boolean indicating if the modality check passed
     */
    private getModalityValue(
        extraction: Extraction,
        _: Guard,
        matchName?: string
    ): boolean {
        if (!extraction.modalities) {
            return false;
        }

        if (matchName) {
            // Check for specific modality
            return extraction.modalities.some(m => m.group === matchName);
        }

        // Check if any modality exists
        return extraction.modalities.length > 0;
    }
}
