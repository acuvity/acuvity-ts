import { DEFAULT_THRESHOLD, Threshold } from './threshold.js'
import { GuardName } from "./constants.js";
import { GuardConfigValidationError, GuardConfigError } from "./errors.js";

export class Match {
    readonly threshold: Threshold;
    readonly redact: boolean;
    readonly countThreshold: number;

    private constructor(
        threshold: Threshold,
        redact: boolean = false,
        countThreshold: number = 0
    ) {
        this.threshold = threshold;
        this.redact = redact;
        this.countThreshold = countThreshold;
        Object.freeze(this);
    }

    static create(
        threshold: string | Threshold = DEFAULT_THRESHOLD,
        redact: boolean = false,
        countThreshold: number = 0
    ): Match {
        const thresholdObj = typeof threshold === 'string'
            ? new Threshold(threshold)
            : threshold;

        return new Match(thresholdObj, redact, countThreshold);
    }
}

// Guard class
export class Guard {
    readonly name: GuardName;
    readonly matches: Record<string, Match>;
    readonly threshold: Threshold;
    readonly countThreshold: number;

    private constructor(
        name: GuardName,
        matches: Record<string, Match>,
        threshold: Threshold,
        countThreshold: number = 0
    ) {
        this.name = name;
        this.matches = matches;
        this.threshold = threshold;
        this.countThreshold = countThreshold;
        Object.freeze(this);
    }

    static create(
        name: string | GuardName,
        matches: Record<string, Match> | null = null,
        threshold: string | Threshold = DEFAULT_THRESHOLD,
        countThreshold: number = 0
    ): Guard {
        // Convert string to GuardName if needed
        let guardName: GuardName;
        if (typeof name === 'string') {
            if (!GuardName.values().includes(name)) {
                const validNames = Object.values(GuardName).join(', ');
                throw new GuardConfigValidationError(
                    `Invalid guard name: ${name}. Must be one of: ${validNames}`
                );
            }
            const guardNameInst = GuardName.get(name);
            if (guardNameInst === undefined) {
                throw new GuardConfigValidationError(`Invalid guard name: ${name}`);
            }
            guardName = guardNameInst;
        } else {
            guardName = name;
        }

        const thresholdObj = typeof threshold === 'string'
            ? new Threshold(threshold)
            : threshold;

        return new Guard(
            guardName,
            matches || {},
            thresholdObj,
            countThreshold
        );
    }
}

// GuardConfig class
export class GuardConfig {
    private parsedGuards: Guard[] = [];

    private constructor() { }

    static async create(config?: string | { [key: string]: any } | Guard[]): Promise<GuardConfig> {
        const instance = new GuardConfig();

        if (!config) {
            // Handle default configuration
            Object.values(GuardName).forEach(guard => {
                if (guard !== GuardName.KEYWORD_DETECTOR) {
                    instance.parsedGuards.push(Guard.create(
                        guard,
                        {},
                        DEFAULT_THRESHOLD,
                        0
                    ));
                }
            });
        } else {
            await instance.parseConfig(config);
        }

        return instance;
    }

    private async parseConfig(config: string | { [key: string]: any } | Guard[]): Promise<Guard[]> {
        if (Array.isArray(config)) {
            if (config.every(guard => guard instanceof Guard)) {
                this.parsedGuards = config
                    .filter(guard => this.validateGuard(guard))
                    .map(guard => this.parseGuardObj(guard));
                return this.parsedGuards;
            } else {
                throw new GuardConfigError(`failed to parse config, array should be of type Guard objects`);
            }
        }

        let configData: { [key: string]: any };
        if (typeof config === 'string') {
            configData = await GuardConfig.loadYaml(config);
        } else {
            configData = config;
        }
        try {
            const guards = configData['guardrails'] || [configData];
            const guardsList = Array.isArray(guards) ? guards : [guards];
            this.parsedGuards = guardsList
                .filter(guard => this.validateGuard(guard))
                .map(guard => this.parseGuard(guard));
            return this.parsedGuards;
        } catch (e) {
            throw new GuardConfigError(`Failed to parse config: ${e}`);
        }
    }

    private static async loadYaml(filePath: string): Promise<{ [key: string]: any }> {
        try {
            let fileContent: string;

            if (typeof Deno !== "undefined") {
                const { readFile } = await import("node:fs/promises");
                // read file
                fileContent = (await readFile(filePath)).toString();
            } else {
                const { readFile } = await import("fs/promises");
                // read file
                fileContent = (await readFile(filePath)).toString();
            }
            const YAML = await import('yaml');
            return YAML.parse(fileContent);
        } catch (e) {
            throw new GuardConfigError(`Failed to load config file: ${e}`);
        }
    }

    private validateGuard(guard: Guard | { [key: string]: any }): boolean {
        if (guard instanceof Guard) {
            if (!Object.values(GuardName).includes(guard.name)) {
                throw new GuardConfigValidationError("Guard must have a valid name");
            }
        } else {
            if (!guard['name']) {
                throw new GuardConfigValidationError("Guard must have a name");
            }
            if (typeof guard['name'] === 'string') {
                if (!GuardName.values().includes(guard['name'])) {
                    throw new GuardConfigValidationError(`Guard name str not present ${guard['name']}`);
                }
            }
            else if (!Object.values(GuardName).includes(guard['name'])) {
                throw new GuardConfigError(`Guard name not present ${guard['name']}`);
            }
        }
        return true;
    }

    parseMatchObj(matchKey: string, matchObj: Match | null): Match {
        if (!matchObj) {
            return Match.create();
        }

        try {
            const threshold = matchObj.threshold || DEFAULT_THRESHOLD;
            return Match.create(
                threshold,
                matchObj.redact,
                matchObj.countThreshold
            );
        } catch (e) {
            throw new GuardConfigValidationError(
                `Invalid match configuration for '${matchKey}': ${e}`
            );
        }
    }

    private parseMatch(matchKey: string, matchData: { [key: string]: any }): Match {
        let threshold = DEFAULT_THRESHOLD;
        if (matchData) {
            if (matchData['threshold']) {
                try {
                    threshold = new Threshold(matchData['threshold'] || '>= 0.0');
                } catch (e) {
                    throw new GuardConfigValidationError(`Invalid threshold for match ${matchKey}`);
                }
            }

            return Match.create(
                threshold,
                matchData['redact'] || false,
                matchData['count_threshold'] || 0
            );
        }
        return Match.create()
    }

    get getMatchGuards(): Guard[] {
        return this.parsedGuards.filter(guard =>
            Object.keys(guard.matches).length > 0
        );
    }

    get getParsedGuards(): Guard[] {
        return this.parsedGuards;
    }

    get getSimpleGuards(): Guard[] {
        return this.parsedGuards.filter(guard =>
            Object.keys(guard.matches).length === 0
        );
    }

    get guardNames(): GuardName[] {
        return this.parsedGuards.map(g => g.name);
    }

    get redactionKeys(): string[] {
        const result = this.getMatchGuards.flatMap(guard => {

            const entries = Object.entries(guard.matches);
            const filtered = entries.filter(([_, match]) => {
                return match.redact;
            });

            const mapped = filtered.map(([key]) => key);
            return mapped;
        });
        return result;
    }

    get keywords(): string[] {
        return this.getMatchGuards
            .filter(guard => guard.name === GuardName.KEYWORD_DETECTOR)
            .flatMap(guard =>
                Object.entries(guard.matches)
                    .filter(([_, match]) => match.redact)
                    .map(([key]) => key)
            );
    }

    private parseGuard(guard: { [key: string]: any }): Guard {
        const name = guard['name'];

        // Parse top-level threshold
        let threshold = DEFAULT_THRESHOLD;
        if (guard['threshold'] !== undefined) {
            threshold = new Threshold(guard['threshold'] || '>= 0.0');
        }
        // Parse matches
        const matches: Record<string, Match> = {};
        if (guard['matches']) {
            Object.entries(guard['matches']).forEach(([matchKey, matchData]) => {
                matches[matchKey] = this.parseMatch(matchKey, matchData as any);
            });
        }

        if (name) {
            return Guard.create(
                name,
                matches,
                threshold,
                guard['count_threshold'] || 0
            );
        }
        throw new GuardConfigValidationError(`Invalid guard name: ${name}`);
    }

    private parseGuardObj(guard: Guard): Guard {
        try {
            const guardName = guard.name;
            const threshold = guard.threshold ?? DEFAULT_THRESHOLD;
            const parsedMatches: Record<string, Match> = {};

            Object.entries(guard.matches).forEach(([matchKey, matchData]) => {
                parsedMatches[matchKey] = this.parseMatchObj(matchKey, matchData);
            });

            return Guard.create(
                guardName,
                parsedMatches,
                threshold,
                guard.countThreshold || 0
            );
        } catch (e) {
            throw new GuardConfigValidationError(`Failed to parse Guard object: ${e}`);
        }
    }
}
