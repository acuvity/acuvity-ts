import { GuardName } from "../guard/constants.js";
import {
    Guard
} from "../guard/config.js";
import { GuardMatch, ResponseMatch } from "./result.js";
import { Extraction } from "../models/components/extraction.js";
import { Textualdetection, TextualdetectionType } from "../models/components/textualdetection.js";

export class ResponseHelper {
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
            if (guard.name.equals(GuardName.PROMPT_INJECTION) ||
                guard.name.equals(GuardName.JAIL_BREAK) ||
                guard.name.equals(GuardName.MALICIOUS_URL)) {
                [exists, value] = this.getGuardValue(extraction.exploits, guard.name.toString());
            }
            else if (guard.name.equals(GuardName.TOXIC) ||
                guard.name.equals(GuardName.BIASED) ||
                guard.name.equals(GuardName.HARMFUL_CONTENT)) {
                [exists, value] = this.getGuardValue(extraction.malcontents, guard.name.toString());
            }
            else if (guard.name.equals(GuardName.MODALITY)) {
                exists = this.getModalityValue(extraction, guard, matchName);
            }
            else if (guard.name.equals(GuardName.LANGUAGE)) {
                if (matchName) {
                    [exists, value] = this.getGuardValue(extraction.languages, matchName);
                } else if (extraction.languages) {
                    exists = Object.keys(extraction.languages).length > 0;
                    value = 1.0;
                }
            }
            else if (guard.name.equals(GuardName.PII_DETECTOR)) {
                [exists, value, matchCount, matchValues] = this.getTextDetectionsType(
                    extraction.piIs,
                    guard,
                    TextualdetectionType.Pii,
                    extraction.detections,
                    matchName
                );
            }
            else if (guard.name.equals(GuardName.SECRETS_DETECTOR)) {
                [exists, value, matchCount, matchValues] = this.getTextDetectionsType(
                    extraction.secrets,
                    guard,
                    TextualdetectionType.Secret,
                    extraction.detections,
                    matchName
                );
            }
            else if (guard.name.equals(GuardName.KEYWORD_DETECTOR)) {
                [exists, value, matchCount, matchValues] = this.getTextDetectionsType(
                    extraction.keywords,
                    guard,
                    TextualdetectionType.Keyword,
                    extraction.detections,
                    matchName
                );
            }

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

    private getGuardValue(
        lookup: Record<string, number> | undefined,
        key: string,
    ): [boolean, number] {
        if (!lookup || !lookup[key]) {
            return [false, 0]
        }

        return [true, lookup[key]];

    }

    private getTextDetectionsType(
        lookup: Record<string, number> | undefined,
        guard: Guard,
        detectionType: TextualdetectionType,
        detections: Textualdetection[] | undefined,
        matchName?: string
    ): [exists: boolean, value: number, matchCount: number, matchValues: string[]] {
        if (matchName) {
            if (!detections) {
                return [false, 0, 0, []];
            }

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

            if (count === 0 && lookup && matchName in lookup) {
                const lookupValue = lookup[matchName];
                if (typeof lookupValue === 'number') {
                    return [true, lookupValue, 1, [matchName]]
                }
            }

            if (count === 0) {
                return [false, 0, 0, []];
            }

            const maxScore = textMatches.length > 0 ? Math.max(...textMatches) : 0;
            return [true, maxScore, count, [matchName]];
        }

        const exists = !!lookup && Object.keys(lookup).length > 0;
        return [
            exists,
            exists ? 1.0 : 0.0,
            lookup ? Object.keys(lookup).length : 0,
            lookup ? Object.keys(lookup) : []
        ];
    }

    private getModalityValue(
        extraction: Extraction,
        _: Guard,
        matchName?: string
    ): boolean {
        if (!extraction.modalities) {
            return false;
        }

        if (matchName) {
            return extraction.modalities.some(m => m.group === matchName);
        }

        return extraction.modalities.length > 0;
    }
}
