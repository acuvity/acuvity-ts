import { Scanresponse } from "../models/components/scanresponse.js";
import { GuardConfig } from "../guard/config.js";
import { GuardName } from "../guard/constants.js";
import { ResponseProcessor } from "./processor.js";
import { GuardMatch, Matches, ResponseMatch } from "./result.js"

/**
 * Wrapper for Scanresponse that provides functionality for evaluating content
 * against guard configurations and accessing match results.
 *
 * Processes scan results to determine if content violates defined security policies
 * and provides methods to query those results.
 */
export class ScanResponseMatch {
    private guardConfig: GuardConfig;
    private scanResponse: Scanresponse;
    private numberOfFiles: number;
    private matchDetails: Matches[];

    /**
     * Initialize with scan results and guard configuration.
     *
     * @param scanResponse The results from a content scan
     * @param guardConfig Configuration defining which guards to check and their thresholds
     * @param files File(s) that were scanned (used to calculate correct indices)
     * @throws Error if guard configuration is missing or processing fails
     */
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

        // Process the scan response against the guard configuration
        try {
            const processor = new ResponseProcessor(this.scanResponse, this.guardConfig);
            this.matchDetails = processor.matches();
        } catch (e: any) {
            throw new Error(`Failed to process match: ${String(e)}`);
        }
    }

    /**
     * Count the number of files to help calculate correct message indices.
     *
     * @param files Files that were scanned
     * @returns Number of files
     */
    private countFiles(files?: string | string[]): number {
        if (!files) {
            return 0;
        }
        return typeof files === "string" ? 1 : files.length;
    }

    /**
     * Returns the match results for specified files or messages.
     *
     * @param options Object containing fileIndex and/or msgIndex
     * @returns List of Matches objects containing guard check results
     * @throws Error if file index is specified but no files were scanned
     *
     * Notes:
     * - Match results are ordered with files first, then messages
     * - If both indices are -1, all results are returned
     */
    public matches(options: { fileIndex?: number; msgIndex?: number } = {}): Matches[] {
        const { fileIndex = -1, msgIndex = -1 } = options;

        if (this.numberOfFiles === 0 && fileIndex !== -1) {
            throw new Error("cannot specify file index, as no files found in the scan request")
        }

        /**
         * Helper to get match results at a specific index.
         *
         * @param idx Index to retrieve matches from
         * @returns Matches at the specified index
         * @throws Error if index is invalid
         */
        const searchAtIndex = (idx: number): Matches => {
            if (idx >= 0 && idx < this.matchDetails.length) {
                const match = this.matchDetails[idx];
                if (match !== undefined) {
                    return match; // Explicitly return the match if it's defined
                }
            }
            throw new Error(`Invalid index ${idx}`);
        };

        // If specific indices are requested, return only those results
        if (fileIndex !== -1 || msgIndex !== -1) {
            const results: Matches[] = [];
            if (fileIndex !== -1) results.push(searchAtIndex(fileIndex));
            if (msgIndex !== -1) results.push(searchAtIndex(msgIndex + this.numberOfFiles));
            return results;
        }

        // Return all match results if no specific indices requested
        return this.matchDetails;
    }

    /**
     * Retrieves match results for a specific guard type.
     *
     * @param guard Name of the specific guard to check
     * @param fileIndex Specific file to check (-1 for all)
     * @param msgIndex Specific message to check (-1 for all)
     * @returns List of GuardMatch objects for the specified guard
     *
     * Notes:
     * - Returns a default "no match" result if no matches found
     * - Can search in specific files/messages or across all content
     */
    public guardMatch(
        guard: GuardName,
        fileIndex: number = -1,
        msgIndex: number = -1
    ): GuardMatch[] {
        const matches: GuardMatch[] = [];

        /**
         * Helper to search for guard matches at a specific index.
         *
         * @param idx Index to search for matches
         * @throws Error if index is out of range
         */
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

        // If specific indices are provided, search only those
        if (fileIndex !== -1 || msgIndex !== -1) {
            if (fileIndex !== -1) searchAtIndex(fileIndex);
            if (msgIndex !== -1) searchAtIndex(msgIndex + this.numberOfFiles);
        } else {
            // Otherwise, search all match details
            for (const singleMatch of this.matchDetails) {
                for (const check of singleMatch.matchedChecks) {
                    if (check.guardName === guard) matches.push(check);
                }
            }
        }

        // If no matches found, return a "default" negative match
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
     *
     * @param key Property name to access from scanResponse
     * @returns Value of the requested property
     */
    public get(key: keyof Scanresponse): any {
        return this.scanResponse[key];
    }

    /**
     * Optionally provide a proxy-like mechanism for direct property access.
     * This allows transparent access to all Scanresponse attributes.
     *
     * @param key Property name to access
     * @returns Value of the requested property
     * @throws Error if the property doesn't exist on scanResponse
     */
    [key: string]: any;
    public getProperty(key: string): any {
        if (key in this.scanResponse) {
            return (this.scanResponse as any)[key];
        }
        throw new Error(`Property ${key} does not exist on Scanresponse.`);
    }
}
