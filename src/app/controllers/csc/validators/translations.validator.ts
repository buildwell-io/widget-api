import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint()
export class IsTranslations implements ValidatorConstraintInterface {
    validate(value: unknown) {
        const isNonEmptyString = (v: unknown): boolean => typeof v === 'string' && v.length > 0;
        const isObject = typeof value === 'object' && value != null && !Array.isArray(value);
        const entries = Object.entries(value);
        return isObject && entries.length > 0 && entries.every(([ k, v ]) => isNonEmptyString(k) && isNonEmptyString(v));
    }

    defaultMessage(): string {
        return '';
    }
}
