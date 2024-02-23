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

export class UpdateCitiesDTO {
    @MaxLength(255)
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'The name of the city',
        maxLength: 255,
        example: 'Los Angeles',
    })
    name: string;

    @IsPositive()
    @IsOptional()
    @ApiProperty({
        description: 'The ID of the associated state',
        example: 1,
    })
    stateId: number;

    @MaxLength(255)
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'The code of the associated state',
        maxLength: 255,
        example: 'CA',
    })
    stateCode: string;

    @IsPositive()
    @IsOptional()
    @ApiProperty({
        description: 'The ID of the associated country',
        example: 1,
    })
    countryId: number;

    @Length(2, 2)
    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'The ISO 3166-1 alpha-2 country code',
        maxLength: 2,
        example: 'US',
    })
    countryCode: string;

    @IsLatitude()
    @IsOptional()
    @ApiProperty({
        description: 'The latitude of the city',
        example: 34.0522,
    })
    latitude: number;

    @IsLongitude()
    @IsOptional()
    @ApiProperty({
        description: 'The longitude of the city',
        example: -118.2437,
    })
    longitude: number;

    @IsBoolean()
    @IsOptional()
    @ApiProperty({
        description: 'Flag indicating whether the city is active',
        default: true,
        example: true,
    })
    flag: boolean;

    @MaxLength(255)
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'Wikidata ID of the city',
        maxLength: 255,
        example: 'Q65',
        nullable: true,
    })
    wikiDataId: string | null;
}
