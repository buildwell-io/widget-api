import { safeJSONParse } from '@app/utilities';
import { ApiProperty } from '@nestjs/swagger';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { CountryEntity } from './country.entity';
import { SubregionEntity } from './subregion.entity';

@Entity('regions')
export class RegionEntity {
    @PrimaryGeneratedColumn()
    @ApiProperty({
        description: 'The unique identifier of the region',
        example: 1,
    })
    id: number;

    @Column({
        type: 'varchar',
        length: 100,
    })
    @ApiProperty({
        description: 'The name of the region',
        maxLength: 100,
        example: 'North America',
    })
    name: string;

    @Column({
        type: 'text',
        nullable: true,
        transformer: {
            from: (raw) => safeJSONParse(raw),
            to: (processed) => JSON.stringify(processed),
        },
    })
    @ApiProperty({
        description: 'Translations for the region name',
        nullable: true,
        type: 'string',
        example: { 'fr': 'Amérique du Nord' },
    })
    translations: Record<string, string> | null; // key is `rfc5646`

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamp with time zone',
        nullable: true,
    })
    @ApiProperty({
        description: 'The creation date of the region record',
        type: 'string',
        format: 'date-time',
        nullable: true,
        example: '2023-01-01T00:00:00Z',
    })
    createdAt: Date | null;

    @UpdateDateColumn({
        name: 'updated_at',
        type: 'timestamp with time zone',
        nullable: true,
    })
    @ApiProperty({
        description: 'The last update date of the region record',
        type: 'string',
        format: 'date-time',
        nullable: true,
        example: '2023-01-02T00:00:00Z',
    })
    updatedAt: Date | null;

    @Column({
        type: 'boolean',
        default: true,
    })
    @ApiProperty({
        description: 'Flag indicating whether the region is active',
        default: true,
        example: true,
    })
    flag: boolean;

    @Column({
        name: 'wikidataid',
        type: 'varchar',
        length: 255,
        nullable: true,
    })
    @ApiProperty({
        description: 'Wikidata ID of the region',
        maxLength: 255,
        nullable: true,
        example: 'Q55',
    })
    wikiDataId: string | null;

    /* RELATIONS */

    @OneToMany(() => SubregionEntity, (subregion) => subregion.region)
    subregions: SubregionEntity[];

    @OneToMany(() => CountryEntity, (country) => country.region)
    countries: CountryEntity[];
}
