import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength, Validate } from 'class-validator';

import { IsTranslations } from '../validators';

export class UpdateRegionDTO {
    @MaxLength(100)
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'The name of the region',
        maxLength: 100,
        example: 'North America',
    })
    readonly name: string;

    @Validate(IsTranslations)
    @IsOptional()
    @ApiProperty({
        description: 'Translations for the region name',
        nullable: true,
        type: 'string',
        example: { 'fr': 'Amérique du Nord' },
    })
    readonly translations: Record<string, string> | null; // key is `rfc5646`

    @IsBoolean()
    @IsOptional()
    @ApiProperty({
        description: 'Flag indicating whether the region is active',
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
