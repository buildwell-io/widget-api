import { CountryTimezone } from '@app/database';
import { ApiProperty } from '@nestjs/swagger';
import {
    IsArray,
    IsBoolean,
    IsLatitude,
    IsLongitude,
    IsNotEmpty,
    IsOptional,
    IsPositive,
    IsString,
    Length,
    MaxLength,
    Validate,
} from 'class-validator';

import { IsTimezones, IsTranslations } from '../validators';

export class UpdateCountryDTO {
    @MaxLength(100)
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'The name of the country',
        maxLength: 100,
        example: 'United States',
    })
    readonly name: string;

    @Length(3, 3)
    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'The ISO 3166-1 alpha-3 country code',
        maxLength: 3,
        example: 'USA',
        nullable: true,
    })
    readonly iso3: string | null;

    @Length(3, 3)
    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'The numeric country code',
        maxLength: 3,
        example: '840',
        nullable: true,
    })
    readonly numericCode: string | null;

    @Length(2, 2)
    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'The ISO 3166-1 alpha-2 country code',
        maxLength: 2,
        example: 'US',
        nullable: true,
    })
    readonly iso2: string | null;

    @MaxLength(255)
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'The country phone code',
        maxLength: 255,
        example: '+1',
        nullable: true,
    })
    readonly phoneCode: string | null;

    @MaxLength(255)
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'The capital of the country',
        maxLength: 255,
        example: 'Washington D.C.',
        nullable: true,
    })
    readonly capital: string | null;

    @MaxLength(255)
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'The country currency code',
        maxLength: 255,
        example: 'USD',
        nullable: true,
    })
    readonly currency: string | null;

    @MaxLength(255)
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'The name of the country currency',
        maxLength: 255,
        example: 'United States dollar',
        nullable: true,
    })
    readonly currencyName: string | null;

    @MaxLength(255)
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'The currency symbol',
        maxLength: 255,
        example: '$',
        nullable: true,
    })
    readonly currencySymbol: string | null;

    @MaxLength(255)
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'The top-level domain of the country',
        maxLength: 255,
        example: '.us',
        nullable: true,
    })
    readonly tld: string | null;

    @MaxLength(255)
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'The native name of the country',
        maxLength: 255,
        example: 'United States',
        nullable: true,
    })
    readonly native: string | null;

    @MaxLength(255)
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'The region of the country',
        maxLength: 255,
        example: 'Americas',
        nullable: true,
    })
    readonly regionName: string | null;

    @IsPositive()
    @IsOptional()
    @ApiProperty({
        description: 'The ID of the associated region',
        example: 2,
        nullable: true,
    })
    readonly regionId: number | null;

    @MaxLength(255)
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'The subregion of the country',
        maxLength: 255,
        example: 'Northern America',
        nullable: true,
    })
    readonly subregionName: string | null;

    @IsPositive()
    @IsOptional()
    @ApiProperty({
        description: 'The ID of the associated subregion',
        example: 3,
        nullable: true,
    })
    readonly subregionId: number | null;

    @MaxLength(255)
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'The nationality of the country',
        maxLength: 255,
        example: 'American',
        nullable: true,
    })
    readonly nationality: string | null;

    @Validate(IsTimezones, { each: true })
    @IsArray()
    @IsOptional()
    @ApiProperty({
        description: 'The timezones of the country',
        type: 'string',
        example: [ {
            'zoneName': 'Asia/Yerevan',
            'gmtOffset': 14400,
            'gmtOffsetName': 'UTC+04:00',
            'abbreviation': 'AMT',
            'tzName': 'Armenia Time',
        } ],
        nullable: true,
    })
    readonly timezones: CountryTimezone[] | null;

    @Validate(IsTranslations)
    @IsOptional()
    @ApiProperty({
        description: 'Translations for the country name',
        nullable: true,
        type: 'string',
        example: { 'fr': 'États-Unis' },
    })
    readonly translations: Record<string, string> | null; // key is `rfc5646`

    @IsLatitude()
    @IsOptional()
    @ApiProperty({
        description: 'The latitude of the country',
        example: 37.09024,
        nullable: true,
    })
    readonly latitude: number | null;

    @IsLongitude()
    @IsOptional()
    @ApiProperty({
        description: 'The longitude of the country',
        example: -95.712891,
        nullable: true,
    })
    readonly longitude: number | null;

    @MaxLength(191)
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'The emoji of the country',
        maxLength: 191,
        example: '🇺🇸',
        nullable: true,
    })
    readonly emoji: string | null;

    @MaxLength(191)
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'The unicode representation of the country\'s emoji',
        maxLength: 191,
        example: 'U+1F1FA U+1F1F8',
        nullable: true,
    })
    readonly emojiu: string | null;

    @IsBoolean()
    @IsOptional()
    @ApiProperty({
        description: 'Flag indicating whether the country is active',
        default: true,
        example: true,
    })
    readonly flag: boolean;

    @MaxLength(255)
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'Wikidata ID of the country',
        maxLength: 255,
        example: 'Q30',
        nullable: true,
    })
    readonly wikiDataId: string | null;
}
