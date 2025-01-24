import { ComparisonOperator } from './constants.js'
import { GuardConfigValidationError } from './errors.js';

export class Threshold {
    private operator: ComparisonOperator;
    private value: number;

    constructor(thresholdStr: string) {
        try {
            // First try to convert the entire string to float (case when only number provided)
            const numValue = parseFloat(thresholdStr);
            if (!isNaN(numValue)) {
                this.value = numValue;
                if (this.value < 0 || this.value > 1) {
                    throw new GuardConfigValidationError("Invalid threshold value");
                }
                this.operator = ComparisonOperator.GREATER_EQUAL; // Default operator
                return;
            }

            // If that fails, try to split into operator and value
            const parts = thresholdStr.trim().split(/\s+/);
            if (parts.length !== 2) {
                throw new GuardConfigValidationError("Invalid threshold format, correct example: '>= 0.2'");
            }

            const [operatorStr, valueStr] = parts;
            if (valueStr == undefined) {
                throw new GuardConfigValidationError("Invalid threshold value");
            }
            this.value = parseFloat(valueStr);

            if (isNaN(this.value)) {
                throw new GuardConfigValidationError("Invalid threshold value");
            }

            // Check if the operator string is a valid ComparisonOperator
            if (!Object.values(ComparisonOperator).includes(operatorStr as ComparisonOperator)) {
                throw new GuardConfigValidationError(`Invalid operator: ${operatorStr}`);
            }

            this.operator = operatorStr as ComparisonOperator;

        } catch (e) {
            if (e instanceof GuardConfigValidationError) {
                throw e;
            }
            throw new GuardConfigValidationError("Invalid threshold format");
        }
    }

    toString(): string {
        return `${this.operator} ${this.value}`;
    }

    compare(value: number): boolean {
        switch (this.operator) {
            case ComparisonOperator.GREATER_THAN:
                return value > this.value;
            case ComparisonOperator.GREATER_EQUAL:
                return value >= this.value;
            case ComparisonOperator.EQUAL:
                return value === this.value;
            case ComparisonOperator.LESS_EQUAL:
                return value <= this.value;
            case ComparisonOperator.LESS_THAN:
                return value < this.value;
            default:
                return false;
        }
    }
}


export const DEFAULT_THRESHOLD = new Threshold(">= 0.0");
