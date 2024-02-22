import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import Joi from 'joi';

const timezoneSchema = Joi.object({
    zoneName: Joi.string(),
    gmtOffset: Joi.number(),
    gmtOffsetName: Joi.string(),
    abbreviation: Joi.string(),
    tzName: Joi.string(),
});

@ValidatorConstraint()
export class IsTimezones implements ValidatorConstraintInterface {
    validate(value: any): Promise<boolean> | boolean {
        const hasError = !!timezoneSchema.validate(value, { presence: 'required' }).error;
        return !hasError;
    }

    defaultMessage(): string {
        return '';
    }
}
