import { Scanresponse } from "../models/components/scanresponse.js";
import { GuardConfig } from "../guard/config.js";
import { GuardName } from "../guard/constants.js";
import { ResponseProcessor } from "./processor.js";
import { GuardMatch, Matches, ResponseMatch } from "./result.js"

export class ScanResponseMatch {
    private guardConfig: GuardConfig;
    private scanResponse: Scanresponse;
    private numberOfFiles: number;
    private matchDetails: Matches[];

    constructor(
        scanResponse: Scanresponse,
        guardConfig: GuardConfig,
        files?: string | string[]
    ) {
        this.guardConfig = guardConfig;
        this.scanResponse = scanResponse;
        this.numberOfFiles = this.countFiles(files);

        if (!this.guardConfig) {
            throw new Error("No guard configuration was passed or available in the instance.");
        }

        try {
            const processor = new ResponseProcessor(this.scanResponse, this.guardConfig);
            this.matchDetails = processor.matches();
        } catch (e: any) {
            throw new Error(`Failed to process match: ${String(e)}`);
        }
    }

    private countFiles(files?: string | string[]): number {
        if (!files) {
            return 0;
        }
        return typeof files === "string" ? 1 : files.length;
    }

    // Overall match
    public matches(fileIndex: number = -1, msgIndex: number = -1): Matches[] {
        const searchAtIndex = (idx: number): Matches => {
            if (idx >= 0 && idx < this.matchDetails.length) {
                const match = this.matchDetails[idx];
                if (match !== undefined) {
                    return match; // Explicitly return the match if it's defined
                }
            }
            throw new Error(`Invalid index ${idx}`);
        };

        if (fileIndex !== -1 || msgIndex !== -1) {
            const results: Matches[] = [];
            if (fileIndex !== -1) results.push(searchAtIndex(fileIndex));
            if (msgIndex !== -1) results.push(searchAtIndex(msgIndex + this.numberOfFiles));
            return results;
        }

        return this.matchDetails;
    }


    //single guard's match.
    public guardMatch(
        guard: GuardName,
        fileIndex: number = -1,
        msgIndex: number = -1
    ): GuardMatch[] {
        const matches: GuardMatch[] = [];

        const searchAtIndex = (idx: number) => {
            if (idx >= 0 && idx < this.matchDetails.length) {
                const matchedChecks = this.matchDetails[idx]?.matchedChecks;
                if (matchedChecks !== undefined) {
                    for (const check of matchedChecks) {
                        if (check.guardName === guard) matches.push(check);
                    }
                }
            } else {
                throw new Error(`Index ${idx} is out of range.`);
            }
        };

        if (fileIndex !== -1 || msgIndex !== -1) {
            if (fileIndex !== -1) searchAtIndex(fileIndex);
            if (msgIndex !== -1) searchAtIndex(msgIndex + this.numberOfFiles);
        } else {
            for (const singleMatch of this.matchDetails) {
                for (const check of singleMatch.matchedChecks) {
                    if (check.guardName === guard) matches.push(check);
                }
            }
        }

        if (matches.length === 0) {
            matches.push({
                responseMatch: ResponseMatch.NO,
                guardName: guard,
                threshold: "> 0.0",
                actualValue: 0.0,
            });
        }

        return matches;
    }

    /**
     * Dynamically delegate access to `scanResponse` properties.
     */
    public get(key: keyof Scanresponse): any {
        return this.scanResponse[key];
    }

    /**
     * Optionally provide a proxy-like mechanism for direct property access.
     */
    [key: string]: any;
    public getProperty(key: string): any {
        if (key in this.scanResponse) {
            return (this.scanResponse as any)[key];
        }
        throw new Error(`Property ${key} does not exist on Scanresponse.`);
    }
}
