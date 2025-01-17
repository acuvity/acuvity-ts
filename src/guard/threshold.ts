import { ComparisonOperator } from './constants.js'
import { GuardConfigValidationError } from './errors.js';

export class Threshold {
    private operator: ComparisonOperator;
    private value: number;

    constructor(threshold_str: string) {
        try {
            // First try to convert the entire string to float (case when only number provided)
            const numValue = parseFloat(threshold_str);
            if (!isNaN(numValue)) {
                this.value = numValue;
                this.operator = ComparisonOperator.GREATER_EQUAL; // Default operator
                return;
            }

            // If that fails, try to split into operator and value
            const parts = threshold_str.trim().split(/\s+/);
            if (parts.length !== 2) {
                throw new GuardConfigValidationError("Invalid threshold format");
            }

            const [operator_str, value_str] = parts;
            if (value_str == undefined) {
                throw new GuardConfigValidationError("Invalid threshold value");
            }
            this.value = parseFloat(value_str);

            if (isNaN(this.value)) {
                throw new GuardConfigValidationError("Invalid threshold value");
            }

            // Check if the operator string is a valid ComparisonOperator
            if (!Object.values(ComparisonOperator).includes(operator_str as ComparisonOperator)) {
                throw new GuardConfigValidationError(`Invalid operator: ${operator_str}`);
            }

            this.operator = operator_str as ComparisonOperator;

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
