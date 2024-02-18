import { RegionEntity } from '@app/database';
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

import { CityEntity } from './city.entity';
import { StateEntity } from './state.entity';
import { SubregionEntity } from './subregion.entity';

export interface CountryTimezone {
    zoneName: string;
    gmtOffset: number; // msec ?
    gmtOffsetName: string;
    abbreviation: string;
    tzName: string;
}

@Entity('countries')
export class CountryEntity {
    @PrimaryGeneratedColumn()
    @ApiProperty({
        description: 'The unique identifier of the country',
        example: 1,
    })
    id: number;

    @Column({
        type: 'varchar',
        length: 100,
    })
    @ApiProperty({
        description: 'The name of the country',
        maxLength: 100,
        example: 'United States',
    })
    name: string;

    @Column({
        type: 'char',
        length: 3,
        nullable: true,
    })
    @ApiProperty({
        description: 'The ISO 3166-1 alpha-3 country code',
        maxLength: 3,
        example: 'USA',
        nullable: true,
    })
    iso3: string | null;

    @Column({
        name: 'numeric_code',
        type: 'char',
        length: 3,
        nullable: true,
    })
    @ApiProperty({
        description: 'The numeric country code',
        maxLength: 3,
        example: '840',
        nullable: true,
    })
    numericCode: string | null;

    @Column({
        type: 'char',
        length: 2,
        nullable: true,
    })
    @ApiProperty({
        description: 'The ISO 3166-1 alpha-2 country code',
        maxLength: 2,
        example: 'US',
        nullable: true,
    })
    iso2: string | null;

    @Column({
        name: 'phonecode',
        type: 'varchar',
        length: 255,
        nullable: true,
    })
    @ApiProperty({
        description: 'The country phone code',
        maxLength: 255,
        example: '+1',
        nullable: true,
    })
    phoneCode: string | null;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: true,
    })
    @ApiProperty({
        description: 'The capital of the country',
        maxLength: 255,
        example: 'Washington D.C.',
        nullable: true,
    })
    capital: string | null;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: true,
    })
    @ApiProperty({
        description: 'The country currency code',
        maxLength: 255,
        example: 'USD',
        nullable: true,
    })
    currency: string | null;

    @Column({
        name: 'currency_name',
        type: 'varchar',
        length: 255,
        nullable: true,
    })
    @ApiProperty({
        description: 'The name of the country currency',
        maxLength: 255,
        example: 'United States dollar',
        nullable: true,
    })
    currencyName: string | null;

    @Column({
        name: 'currency_symbol',
        type: 'varchar',
        length: 255,
        nullable: true,
    })
    @ApiProperty({
        description: 'The currency symbol',
        maxLength: 255,
        example: '$',
        nullable: true,
    })
    currencySymbol: string | null;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: true,
    })
    @ApiProperty({
        description: 'The top-level domain of the country',
        maxLength: 255,
        example: '.us',
        nullable: true,
    })
    tld: string | null;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: true,
    })
    @ApiProperty({
        description: 'The native name of the country',
        maxLength: 255,
        example: 'United States',
        nullable: true,
    })
    native: string | null;

    @Column({
        name: 'region',
        type: 'varchar',
        length: 255,
        nullable: true,
    })
    @ApiProperty({
        description: 'The region of the country',
        maxLength: 255,
        example: 'Americas',
        nullable: true,
    })
    regionName: string | null;

    @Column({
        name: 'region_id',
        nullable: true,
    })
    @ApiProperty({
        description: 'The ID of the associated region',
        example: 2,
        nullable: true,
    })
    regionId: number | null;

    @Column({
        name: 'subregion',
        type: 'varchar',
        length: 255,
        nullable: true,
    })
    @ApiProperty({
        description: 'The subregion of the country',
        maxLength: 255,
        example: 'Northern America',
        nullable: true,
    })
    subregionName: string | null;

    @Column({
        name: 'subregion_id',
        nullable: true,
    })
    @ApiProperty({
        description: 'The ID of the associated subregion',
        example: 3,
        nullable: true,
    })
    subregionId: number | null;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: true,
    })
    @ApiProperty({
        description: 'The nationality of the country',
        maxLength: 255,
        example: 'American',
        nullable: true,
    })
    nationality: string | null;

    @Column({
        type: 'text',
        nullable: true,
        transformer: {
            from: (raw) => safeJSONParse(raw),
            to: (processed) => JSON.stringify(processed),
        },
    })
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
    timezones: CountryTimezone[] | null;

    @Column({
        type: 'text',
        nullable: true,
        transformer: {
            from: (raw) => safeJSONParse(raw),
            to: (processed) => JSON.stringify(processed),
        },
    })
    @ApiProperty({
        description: 'Translations for the country name',
        nullable: true,
        type: 'string',
        example: { 'fr': 'États-Unis' },
    })
    translations: Record<string, string> | null; // key is `rfc5646`

    @Column({
        type: 'numeric',
        precision: 10,
        scale: 8,
        nullable: true,
    })
    @ApiProperty({
        description: 'The latitude of the country',
        example: 37.09024,
        nullable: true,
    })
    latitude: number | null;

    @Column({
        type: 'numeric',
        precision: 11,
        scale: 8,
        nullable: true,
    })
    @ApiProperty({
        description: 'The longitude of the country',
        example: -95.712891,
        nullable: true,
    })
    longitude: number | null;

    @Column({
        type: 'varchar',
        length: 191,
        nullable: true,
    })
    @ApiProperty({
        description: 'The emoji of the country',
        maxLength: 191,
        example: '🇺🇸',
        nullable: true,
    })
    emoji: string | null;

    @Column({
        type: 'varchar',
        length: 191,
        nullable: true,
    })
    @ApiProperty({
        description: 'The unicode representation of the country\'s emoji',
        maxLength: 191,
        example: 'U+1F1FA U+1F1F8',
        nullable: true,
    })
    emojiu: string | null;

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamp with time zone',
        nullable: true,
    })
    @ApiProperty({
        description: 'The creation date of the country record',
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
        description: 'The last update date of the country record',
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
        description: 'Flag indicating whether the country is active',
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
        description: 'Wikidata ID of the country',
        maxLength: 255,
        example: 'Q30',
        nullable: true,
    })
    wikiDataId: string | null;

    /* RELATIONS */

    @ManyToOne(() => RegionEntity, (region) => region.countries)
    @JoinColumn({ name: 'region_id' })
    region: RegionEntity;

    @ManyToOne(() => SubregionEntity, (region) => region.countries)
    @JoinColumn({ name: 'subregion_id' })
    subregion: SubregionEntity;

    @OneToMany(() => StateEntity, (state) => state.country)
    states: StateEntity[];

    @OneToMany(() => CityEntity, (city) => city.country)
    cities: CityEntity[];
}
