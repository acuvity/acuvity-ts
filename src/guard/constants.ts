export enum ComparisonOperator {
    GREATER_THAN = '>',
    GREATER_EQUAL = '>=',
    EQUAL = '=',
    LESS_EQUAL = '<=',
    LESS_THAN = '<'
}

export class GuardName {

    static readonly PROMPT_INJECTION = new GuardName("prompt_injection");
    static readonly JAIL_BREAK = new GuardName("jail_break");
    static readonly MALICIOUS_URL = new GuardName("malicious_url");
    static readonly TOXICITY = new GuardName("toxicity");
    static readonly BIAS = new GuardName("bias");
    static readonly HARMFUL_CONTENT = new GuardName("harmful");
    static readonly LANGUAGE = new GuardName("language");
    static readonly MODALITY = new GuardName("modality");
    static readonly PII_DETECTOR = new GuardName("pii_detector");
    static readonly SECRETS_DETECTOR = new GuardName("secrets_detector");
    static readonly KEYWORD_DETECTOR = new GuardName("keyword_detector");

    private constructor(private readonly value: string) { }

    toString(): string {
        return this.value;
    }

    /**
     * Get all guard name values as strings
     */
    static values(): string[] {
        return Object.values(GuardName)
            .filter(value => value instanceof GuardName)
            .map(guardName => (guardName as GuardName).value);
    }

    /**
     * Check if the input string represents a valid guard name
     */
    static valid(guard: string): boolean {
        return GuardName.values().includes(guard);
    }

    /**
     * Get GuardName instance from string, returns undefined if invalid
     */
    static get(name: string): GuardName | undefined {
        const guardName = name.toLowerCase();
        const found = Object.values(GuardName)
            .filter(value => value instanceof GuardName)
            .find(value => (value as GuardName).value === guardName);

        return found as GuardName | undefined;
    }

    /**
     * Compare two GuardName instances
     */
    equals(other: GuardName): boolean {
        return this.value === other.value;
    }

    /**
     * Get all available guard names as GuardName instances
     */
    static getAll(): GuardName[] {
        return Object.values(GuardName)
            .filter(value => value instanceof GuardName) as GuardName[];
    }
}
