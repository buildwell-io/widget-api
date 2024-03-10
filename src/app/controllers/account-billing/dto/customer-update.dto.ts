import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsString, ValidateNested } from 'class-validator';
import Stripe from 'stripe';

export class StripeAddress implements Stripe.AddressParam {
    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'City, district, suburb, town, village, or ward.',
        example: 'Kyiv',
    })
    readonly city?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'Two-letter country code ISO 3166-1 alpha-2 (https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).',
        example: 'UA',
    })
    readonly country?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ description: 'Address line 1 (e.g., street, block, PO Box, or company name).' })
    readonly line1?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ description: 'Address line 2 (e.g., apartment, suite, unit, or building).' })
    readonly line2?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'ZIP or postal code.',
        example: '02000',
    })
    readonly postal_code?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'State, county, province, prefecture, or region.',
        example: 'Kyiv',
    })
    readonly state?: string;
}

export class CustomerUpdateDTO implements Stripe.CustomerUpdateParams {
    @Type(() => StripeAddress)
    @ValidateNested()
    @IsOptional()
    @ApiProperty({ type: StripeAddress, required: false })
    readonly address: StripeAddress;
}
