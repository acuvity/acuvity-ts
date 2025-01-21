import { GuardName } from "../guard/constants.js";
import {
    Guard
} from "../guard/config.js";
import { GuardMatch, ResponseMatch } from "./result.js";
import { Extraction } from "../models/components/extraction.js";
import { Textualdetection, TextualdetectionType } from "../models/components/textualdetection.js";

// Discriminated union for all possible return types
type ValueGetterResult =
    | { type: 'boolean'; exists: boolean; }
    | { type: 'guard'; exists: boolean; value: number; }
    | { type: 'detection'; exists: boolean; value: number; matchCount: number; };

export class ResponseHelper {
    private valueGetters: Record<string, (
        extraction: Extraction,
        guard: Guard,
        matchName?: string
    ) => ValueGetterResult> = {
            [GuardName.PROMPT_INJECTION.toString()]: this.getGuardValue.bind(this),
            [GuardName.JAIL_BREAK.toString()]: this.getGuardValue.bind(this),
            [GuardName.MALICIOUS_URL.toString()]: this.getGuardValue.bind(this),
            [GuardName.TOXIC.toString()]: this.getGuardValue.bind(this),
            [GuardName.BIASED.toString()]: this.getGuardValue.bind(this),
            [GuardName.HARMFUL_CONTENT.toString()]: this.getGuardValue.bind(this),
            [GuardName.LANGUAGE.toString()]: this.getLanguageValue.bind(this),
            [GuardName.PII_DETECTOR.toString()]: this.getTextDetections.bind(this),
            [GuardName.SECRETS_DETECTOR.toString()]: this.getTextDetections.bind(this),
            [GuardName.KEYWORD_DETECTOR.toString()]: this.getTextDetections.bind(this),
            [GuardName.MODALITY.toString()]: this.getModalityValue.bind(this),
        };

    public evaluate(
        responseExtraction: Extraction,
        guard: Guard,
        matchName?: string
    ): GuardMatch {
        try {
            const result = this.getValue(responseExtraction, guard, matchName);

            if (!result.exists) {
                return {
                    responseMatch: ResponseMatch.NO,
                    guardName: guard.name,
                    threshold: guard.threshold.toString(),
                    actualValue: 'value' in result ? result.value : 0,
                    matchCount: 'matchCount' in result ? result.matchCount : 0
                };
            }

            const comparisonResult = guard.threshold.compare(
                'value' in result ? result.value : 1
            );

            return {
                responseMatch: comparisonResult ? ResponseMatch.YES : ResponseMatch.NO,
                guardName: guard.name,
                threshold: guard.threshold.toString(),
                actualValue: 'value' in result ? result.value : 1,
                matchCount: 'matchCount' in result ? result.matchCount : 0
            };
        } catch (e) {
            throw new Error(`Error in evaluation: ${e instanceof Error ? e.message : String(e)}`);
        }
    }

    private getValue(
        extraction: Extraction,
        guard: Guard,
        matchName?: string
    ): ValueGetterResult {
        const getter = this.valueGetters[guard.name.toString()];
        if (!getter) {
            throw new Error(`No handler for guard name: ${guard.name}`);
        }

        try {
            return getter(extraction, guard, matchName);
        } catch (e) {
            throw new Error(
                `Error getting value for ${guard.name}: ${e instanceof Error ? e.message : String(e)}`
            );
        }
    }

    private getGuardValue(
        extraction: Extraction,
        guard: Guard,
        _?: string
    ): ValueGetterResult {
        const isTopicGuard = [
            GuardName.TOXIC,
            GuardName.BIASED,
            GuardName.HARMFUL_CONTENT
        ].some(g => g.equals(guard.name));

        if (isTopicGuard) {
            const prefix = `content/${guard.name}`;
            if (!extraction.topics) {
                return { type: 'guard', exists: false, value: 0 };
            }
            const value = extraction.topics[prefix];
            return {
                type: 'guard',
                exists: value !== undefined,
                value: value ?? 0
            };
        }

        if (!extraction.exploits) {
            return { type: 'guard', exists: false, value: 0 };
        }
        const value = extraction.exploits[guard.name.toString()];
        return {
            type: 'guard',
            exists: value !== undefined,
            value: value ?? 0
        };
    }

    private getLanguageValue(
        extraction: Extraction,
        _: Guard,
        matchName?: string
    ): ValueGetterResult {
        if (!extraction.languages) {
            return { type: 'guard', exists: false, value: 0 };
        }

        if (matchName) {
            const value = extraction.languages[matchName];
            return {
                type: 'guard',
                exists: value !== undefined,
                value: value ?? 0
            };
        }

        return {
            type: 'guard',
            exists: Object.keys(extraction.languages).length > 0,
            value: 1.0
        };
    }

    private getTextDetections(
        extraction: Extraction,
        guard: Guard,
        matchName?: string
    ): ValueGetterResult {
        switch (guard.name.toString()) {
            case GuardName.KEYWORD_DETECTOR.toString():
                return this.getTextDetectionsType(
                    extraction.keywords,
                    TextualdetectionType.Keyword,
                    extraction.detections,
                    guard,
                    matchName
                );
            case GuardName.SECRETS_DETECTOR.toString():
                return this.getTextDetectionsType(
                    extraction.secrets,
                    TextualdetectionType.Secret,
                    extraction.detections,
                    guard,
                    matchName
                );
            case GuardName.PII_DETECTOR.toString():
                return this.getTextDetectionsType(
                    extraction.piIs,
                    TextualdetectionType.Pii,
                    extraction.detections,
                    guard,
                    matchName
                );
            default:
                return { type: 'detection', exists: false, value: 0, matchCount: 0 };
        }
    }

    private getTextDetectionsType(
        lookup: Record<string, number> | undefined,
        detectionType: TextualdetectionType,
        detections: Textualdetection[] | undefined,
        guard: Guard,
        matchName?: string
    ): ValueGetterResult {
        if (matchName) {
            if (!detections) {
                return { type: 'detection', exists: false, value: 0, matchCount: 0 };
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
                // TS man, Ensure lookupValue is a number
                if (typeof lookupValue === 'number') {
                    return {
                        type: 'detection',
                        exists: true,
                        value: lookupValue,
                        matchCount: 1
                    };
                }
            }

            if (count === 0) {
                return { type: 'detection', exists: false, value: 0, matchCount: 0 };
            }

            const maxScore = textMatches.length > 0 ? Math.max(...textMatches) : 0;
            return {
                type: 'detection',
                exists: true,
                value: maxScore,
                matchCount: count
            };
        }

        const exists = !!lookup && Object.keys(lookup).length > 0;
        return {
            type: 'detection',
            exists,
            value: exists ? 1.0 : 0.0,
            matchCount: lookup ? Object.keys(lookup).length : 0
        };
    }

    private getModalityValue(
        extraction: Extraction,
        _: Guard,
        matchName?: string
    ): ValueGetterResult {
        if (!extraction.modalities) {
            return { type: 'boolean', exists: false };
        }

        if (matchName) {
            return {
                type: 'boolean',
                exists: extraction.modalities.some(m => m.group === matchName)
            };
        }

        return {
            type: 'boolean',
            exists: extraction.modalities.length > 0
        };
    }
}
