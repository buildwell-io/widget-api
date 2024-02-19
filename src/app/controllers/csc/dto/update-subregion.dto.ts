import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsPositive, IsString, MaxLength, Validate } from 'class-validator';

import { IsTranslations } from '../validators';

export class UpdateSubregionDTO {
    @MaxLength(100)
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'The name of the subregion',
        maxLength: 100,
        example: 'California',
    })
    readonly name: string;

    @Validate(IsTranslations)
    @IsOptional()
    @ApiProperty({
        description: 'Translations for the subregion name',
        nullable: true,
        type: 'string',
        example: { 'fr': 'Californie' },
    })
    readonly translations: Record<string, string> | null; // key is `rfc5646`

    @IsPositive()
    @IsOptional()
    @ApiProperty({
        description: 'The ID of the associated region',
        example: 1,
    })
    readonly regionId: number;

    @IsBoolean()
    @IsOptional()
    @ApiProperty({
        description: 'Flag indicating whether the subregion is active',
        default: true,
        example: true,
    })
    readonly flag: boolean;

    @MaxLength(255)
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'Wikidata ID of the region',
        maxLength: 255,
        nullable: true,
        example: 'Q55',
    })
    readonly wikiDataId: string | null;
}
