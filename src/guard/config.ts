import { DEFAULT_THRESHOLD, Threshold } from "./threshold.js";
import { GuardName } from "./constants.js";
import { GuardConfigValidationError, GuardConfigError } from "./errors.js";

export class Match {
    readonly threshold: Threshold;
    readonly redact: boolean;
    readonly count_threshold: number;

    private constructor(
        threshold: Threshold,
        redact: boolean = false,
        count_threshold: number = 0
    ) {
        this.threshold = threshold;
        this.redact = redact;
        this.count_threshold = count_threshold;
        Object.freeze(this);
    }

    static create(
        threshold: string | Threshold = DEFAULT_THRESHOLD,
        redact: boolean = false,
        count_threshold: number = 0
    ): Match {
        const thresholdObj = typeof threshold === 'string'
            ? new Threshold(threshold)
            : threshold;

        return new Match(thresholdObj, redact, count_threshold);
    }
}

// Guard class
export class Guard {
    readonly name: GuardName;
    readonly matches: Record<string, Match>;
    readonly threshold: Threshold;
    readonly count_threshold: number;

    private constructor(
        name: GuardName,
        matches: Record<string, Match>,
        threshold: Threshold,
        count_threshold: number = 0
    ) {
        this.name = name;
        this.matches = matches;
        this.threshold = threshold;
        this.count_threshold = count_threshold;
        Object.freeze(this);
    }

    static create(
        name: string | GuardName,
        matches: Record<string, Match> | null = null,
        threshold: string | Threshold = DEFAULT_THRESHOLD,
        count_threshold: number = 0
    ): Guard {
        // Convert string to GuardName if needed
        let guardName: GuardName;
        if (typeof name === 'string') {
            if (!(name in GuardName)) {
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
            count_threshold
        );
    }
}

// GuardConfig class
export class GuardConfig {
    private _parsed_guards: Guard[] = [];

    constructor(config?: string | { [key: string]: any } | Guard[]) {
        if (!config) {
            // Handle default configuration
            Object.values(GuardName).forEach(guard => {
                if (guard !== GuardName.KEYWORD_DETECTOR) {
                    this._parsed_guards.push(Guard.create(
                        guard,
                        {},
                        DEFAULT_THRESHOLD,
                        0
                    ));
                }
            });
            return;
        }

        this._parse_config(config);
    }

    private static loadYaml(_: string): { [key: string]: any } {
        try {
            // Note: You'll need to use an appropriate YAML library for TypeScript
            // For example: import yaml from 'js-yaml';
            // return yaml.load(fs.readFileSync(path, 'utf8'));
            throw new Error('YAML loading not implemented');
        } catch (e) {
            throw new GuardConfigError(`Failed to load config file: ${e}`);
        }
    }

    private _parse_config(config: string | { [key: string]: any } | Guard[]): Guard[] {
        if (Array.isArray(config) && config.every(guard => guard instanceof Guard)) {
            this._parsed_guards = config
                .filter(guard => this._validate_guard(guard))
                .map(guard => this._parse_guard_obj(guard));
            return this._parsed_guards;
        }

        let configData: { [key: string]: any };
        if (typeof config === 'string') {
            configData = GuardConfig.loadYaml(config);
        } else {
            configData = config;
        }

        try {
            const guards = configData['guardrails'] || [configData];
            const guardsList = Array.isArray(guards) ? guards : [guards];

            this._parsed_guards = guardsList
                .filter(guard => this._validate_guard(guard))
                .map(guard => this._parse_guard(guard));
            return this._parsed_guards;
        } catch (e) {
            throw new GuardConfigError(`Failed to parse config: ${e}`);
        }
    }

    private _validate_guard(guard: Guard | { [key: string]: any }): boolean {
        if (guard instanceof Guard) {
            if (!Object.values(GuardName).includes(guard.name)) {
                throw new GuardConfigValidationError("Guard must have a valid name");
            }
        } else {
            if (!guard['name']) {
                throw new GuardConfigValidationError("Guard must have a name");
            }
            if (!Object.values(GuardName).includes(guard['name'])) {
                throw new GuardConfigValidationError(`Guard name not present ${guard['name']}`);
            }
        }
        return true;
    }

    parse_match_obj(match_key: string, match_obj: Match | null): Match {
        if (!match_obj) {
            return Match.create();
        }

        try {
            const threshold = match_obj.threshold || DEFAULT_THRESHOLD;
            return Match.create(
                threshold,
                match_obj.redact,
                match_obj.count_threshold
            );
        } catch (e) {
            throw new GuardConfigValidationError(
                `Invalid match configuration for '${match_key}': ${e}`
            );
        }
    }

    private _parse_match(match_key: string, match_data: { [key: string]: any }): Match {
        let threshold = DEFAULT_THRESHOLD;
        if ('threshold' in match_data) {
            try {
                threshold = new Threshold(match_data['threshold'] || '>= 0.0');
            } catch (e) {
                throw new GuardConfigValidationError(`Invalid threshold for match ${match_key}`);
            }
        }

        return Match.create(
            threshold,
            match_data['redact'] || false,
            match_data['count_threshold'] || 0
        );
    }

    get match_guards(): Guard[] {
        return this._parsed_guards.filter(guard =>
            Object.keys(guard.matches).length > 0
        );
    }

    get parsed_guards(): Guard[] {
        return this._parsed_guards;
    }

    get simple_guards(): Guard[] {
        return this._parsed_guards.filter(guard =>
            Object.keys(guard.matches).length === 0
        );
    }

    get guard_names(): GuardName[] {
        return this._parsed_guards.map(g => g.name);
    }

    get redaction_keys(): string[] {
        return this.match_guards.flatMap(guard =>
            Object.entries(guard.matches)
                .filter(([_, match]) => match.redact)
                .map(([key]) => key)
        );
    }

    get keywords(): string[] {
        return this.match_guards
            .filter(guard => guard.name === GuardName.KEYWORD_DETECTOR)
            .flatMap(guard =>
                Object.entries(guard.matches)
                    .filter(([_, match]) => match.redact)
                    .map(([key]) => key)
            );
    }

    private _parse_guard(guard: { [key: string]: any }): Guard {
        const name = guard['name'];

        // Parse top-level threshold
        let threshold = DEFAULT_THRESHOLD;
        if ('threshold' in guard) {
            threshold = new Threshold(guard['threshold'] || '>= 0.0');
        }

        // Parse matches
        const matches: Record<string, Match> = {};
        if (guard['matches']) {
            Object.entries(guard['matches']).forEach(([match_key, match_data]) => {
                matches[match_key] = this._parse_match(match_key, match_data as any);
            });
        }

        if (name in GuardName) {
            return Guard.create(
                name,
                matches,
                threshold,
                guard['count_threshold'] || 0
            );
        }
        throw new GuardConfigValidationError(`Invalid guard name: ${name}`);
    }

    private _parse_guard_obj(guard: Guard): Guard {
        try {
            const guardName = guard.name;
            const threshold = guard.threshold ?? DEFAULT_THRESHOLD;
            const parsed_matches: Record<string, Match> = {};

            Object.entries(guard.matches).forEach(([match_key, match_data]) => {
                parsed_matches[match_key] = this.parse_match_obj(match_key, match_data);
            });

            return Guard.create(
                guardName,
                parsed_matches,
                threshold,
                guard.count_threshold || 0
            );
        } catch (e) {
            throw new GuardConfigValidationError(`Failed to parse Guard object: ${e}`);
        }
    }
}
