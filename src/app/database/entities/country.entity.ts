import { RegionEntity } from '@app/database';
import { ApiProperty } from '@nestjs/swagger';
import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne, OneToMany,
    PrimaryGeneratedColumn,
    RelationId,
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
    @ApiProperty({ example: 1337 })
    public id: number;

    @Column({ type: 'varchar' })
    @ApiProperty({ example: 'Ukraine' })
    public name: string;

    @Column({ type: 'char', length: 2 })
    public iso2: string;

    @Column({ type: 'char', length: 3 })
    public iso3: string;

    @Column({ type: 'char', length: 3, name: 'numeric_code' })
    public numericCode: string;

    @Column({ type: 'varchar', name: 'phonecode' })
    public phoneCode: string;

    @Column({ type: 'varchar' })
    public capital: string;

    @Column({ type: 'varchar' })
    public currency: string;

    @Column({ type: 'varchar', name: 'currency_name' })
    public currencyName: string;

    @Column({ type: 'varchar', name: 'currency_symbol' })
    public currencySymbol: string;

    @Column({ type: 'varchar' })
    public tld: string;

    @Column({ type: 'varchar' })
    public native: string;

    @Column({ type: 'varchar', name: 'region' })
    public regionName: string;

    @ManyToOne(() => SubregionEntity, (region) => region.countries)
    public subregion: SubregionEntity;

    @Column({ type: 'int' })
    @RelationId((country: CountryEntity) => country.subregion)
    public subregionId: number;

    @ManyToOne(() => RegionEntity, (region) => region.countries)
    public region: RegionEntity;

    @Column({ type: 'int' })
    @RelationId((country: CountryEntity) => country.region)
    public regionId: number;

    @OneToMany(() => CityEntity, (city) => city.country)
    public cities: CityEntity[];

    @OneToMany(() => StateEntity, (state) => state.country)
    public states: StateEntity[];

    @Column({ type: 'varchar' })
    public nationality: string;

    @Column({
        type: 'text',
        transformer: {
            from: (raw: string): CountryTimezone[] => JSON.parse(raw),
            to: (processed: CountryTimezone[]): string => JSON.stringify(processed),
        },
    })
    public timezones: CountryTimezone[];

    @Column({
        type: 'text',
        transformer: {
            from: (raw: string): Record<string, string> => JSON.parse(raw),
            to: (processed: Record<string, string>): string => JSON.stringify(processed),
        },
    })
    @ApiProperty({ example: { 'uk': 'Україна' } })
    public translations: Record<string, string>; // key is `rfc5646`

    @Column({ type: 'numeric', precision: 10, scale: 8 })
    @ApiProperty({ example: '33.00000000' })
    public latitude: number;

    @Column({ type: 'numeric', precision: 11, scale: 8 })
    @ApiProperty({ example: '65.00000000' })
    public longitude: number;

    @Column({ type: 'varchar' })
    public emoji: string;

    @Column({ type: 'varchar' })
    public emojiu: string;

    @Column({ type: 'boolean' })
    @ApiProperty({ example: true })
    public flag: boolean;

    @Column({ type: 'varchar', name: 'wikidataid' })
    @ApiProperty({ example: 'Q46' })
    public wikiDataId: string;

    @CreateDateColumn({ type: 'timestamp with time zone', name: 'created_at' })
    @ApiProperty({ example: '2021-10-09T10:44:59.011Z' })
    public createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp with time zone', name: 'updated_at' })
    @ApiProperty({ example: '2021-10-09T10:44:59.011Z' })
    public updatedAt: Date;
}
