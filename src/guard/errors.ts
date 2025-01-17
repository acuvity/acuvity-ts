// Custom Error Classes
export class GuardConfigError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'GuardConfigError';
    }
}

export class GuardConfigValidationError extends GuardConfigError {
    constructor(message: string) {
        super(message);
        this.name = 'GuardConfigValidationError';
    }
}

export class GuardThresholdParsingError extends GuardConfigError {
    constructor(message: string) {
        super(message);
        this.name = 'GuardThresholdParsingError';
    }
}
