import { CountryEntity, RegionEntity } from '@app/database';
import { safeJSONParse } from '@app/utilities';
import { ApiProperty } from '@nestjs/swagger';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('subregions')
export class SubregionEntity {
    @PrimaryGeneratedColumn()
    @ApiProperty({
        description: 'The unique identifier of the subregion',
        example: 1,
    })
    id: number;

    @Column({
        type: 'varchar',
        length: 100,
    })
    @ApiProperty({
        description: 'The name of the subregion',
        maxLength: 100,
        example: 'California',
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
        description: 'Translations for the subregion name',
        nullable: true,
        type: 'string',
        example: { 'fr': 'Californie' },
    })
    translations: string | null; // key is `rfc5646`

    @Column({
        type: 'int',
        name: 'region_id',
    })
    @ApiProperty({
        description: 'The ID of the associated region',
        example: 1,
    })
    regionId: number;

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamp with time zone',
        nullable: true,
    })
    @ApiProperty({
        description: 'The creation date of the subregion record',
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
        description: 'The last update date of the subregion record',
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
        description: 'Flag indicating whether the subregion is active',
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
        description: 'Wikidata ID of the subregion',
        maxLength: 255,
        nullable: true,
        example: 'Q99',
    })
    wikiDataId: string | null;

    /* RELATIONS */

    @ManyToOne(() => RegionEntity, (region) => region.subregions)
    @JoinColumn({ name: 'region_id' })
    region: RegionEntity;

    @OneToMany(() => CountryEntity, (country) => country.subregion)
    countries: CountryEntity[];
}
