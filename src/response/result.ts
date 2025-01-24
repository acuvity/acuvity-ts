import { GuardName } from "../guard/constants.js";

export enum ResponseMatch {
    YES = "YES",
    NO = "NO"
}

// guard-match.ts
export interface GuardMatch {
    responseMatch: ResponseMatch;
    guardName: GuardName;  // Assuming GuardName is imported
    actualValue: number;   // Using number instead of float
    threshold: string;
    matchCount?: number;    // With default 0
    matchValues?: string[] | [];
}

// matches.ts
export interface Matches {
    inputData: string;
    responseMatch: ResponseMatch;
    matchedChecks: GuardMatch[];
    allChecks: GuardMatch[];
}
