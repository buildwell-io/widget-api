import { ApiProperty } from '@nestjs/swagger';
import {
    IsBoolean,
    IsLatitude,
    IsLongitude,
    IsNotEmpty,
    IsOptional,
    IsPositive,
    IsString,
    Length,
    MaxLength,
} from 'class-validator';

export class UpdateStateDTO {
    @MaxLength(255)
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'The name of the state',
        maxLength: 255,
        example: 'California',
    })
    readonly name: string;

    @IsPositive()
    @IsOptional()
    @ApiProperty({
        description: 'The ID of the associated country',
        example: 1,
    })
    readonly countryId: number;

    @Length(2, 2)
    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'The ISO 3166-1 alpha-2 country code',
        maxLength: 2,
        example: 'US',
    })
    readonly countryCode: string;

    @MaxLength(255)
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'The FIPS code of the state',
        maxLength: 255,
        example: '06',
        nullable: true,
    })
    readonly fipsCode: string | null;

    @MaxLength(255)
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'The ISO 3166-2 code of the state',
        maxLength: 255,
        example: 'CA',
        nullable: true,
    })
    readonly iso2: string | null;

    @MaxLength(191)
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'The type of the state (e.g., State, Province)',
        maxLength: 191,
        example: 'State',
        nullable: true,
    })
    readonly type: string | null;

    @IsLatitude()
    @IsOptional()
    @ApiProperty({
        description: 'The latitude of the state',
        example: 36.7783,
        nullable: true,
    })
    readonly latitude: number | null;

    @IsLongitude()
    @IsOptional()
    @ApiProperty({
        description: 'The longitude of the state',
        example: -119.4179,
        nullable: true,
    })
    readonly longitude: number | null;

    @IsBoolean()
    @IsOptional()
    @ApiProperty({
        description: 'Flag indicating whether the state is active',
        default: true,
        example: true,
    })
    readonly flag: boolean;

    @MaxLength(255)
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'Wikidata ID of the state',
        maxLength: 255,
        example: 'Q99',
        nullable: true,
    })
    readonly wikiDataId: string | null;
}
