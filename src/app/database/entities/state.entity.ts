import { CountryEntity } from '@app/database';
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

@Entity('states')
export class StateEntity {
    @PrimaryGeneratedColumn()
    @ApiProperty({
        description: 'The unique identifier of the state',
        example: 1,
    })
    id: number;

    @Column({
        type: 'varchar',
        length: 255,
    })
    @ApiProperty({
        description: 'The name of the state',
        maxLength: 255,
        example: 'California',
    })
    name: string;

    @Column({
        name: 'country_id',
        type: 'int',
    })
    @ApiProperty({
        description: 'The ID of the associated country',
        example: 1,
    })
    countryId: number;

    @Column({
        name: 'country_code',
        type: 'char',
        length: 2,
    })
    @ApiProperty({
        description: 'The ISO 3166-1 alpha-2 country code',
        maxLength: 2,
        example: 'US',
    })
    countryCode: string;

    @Column({
        name: 'fips_code',
        type: 'varchar',
        length: 255,
        nullable: true,
    })
    @ApiProperty({
        description: 'The FIPS code of the state',
        maxLength: 255,
        example: '06',
        nullable: true,
    })
    fipsCode: string | null;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: true,
    })
    @ApiProperty({
        description: 'The ISO 3166-2 code of the state',
        maxLength: 255,
        example: 'CA',
        nullable: true,
    })
    iso2: string | null;

    @Column({
        type: 'varchar',
        length: 191,
        nullable: true,
    })
    @ApiProperty({
        description: 'The type of the state (e.g., State, Province)',
        maxLength: 191,
        example: 'State',
        nullable: true,
    })
    type: string | null;

    @Column({
        type: 'numeric',
        precision: 10,
        scale: 8,
        nullable: true,
    })
    @ApiProperty({
        description: 'The latitude of the state',
        example: 36.7783,
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
        description: 'The longitude of the state',
        example: -119.4179,
        nullable: true,
    })
    longitude: number | null;

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamp with time zone',
        nullable: true,
    })
    @ApiProperty({
        description: 'The creation date of the state record',
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
        description: 'The last update date of the state record',
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
        description: 'Flag indicating whether the state is active',
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
        description: 'Wikidata ID of the state',
        maxLength: 255,
        example: 'Q99',
        nullable: true,
    })
    wikiDataId: string | null;

    /* RELATIONS */

    @ManyToOne(() => CountryEntity, (country) => country.states)
    @JoinColumn({ name: 'country_id' })
    country: CountryEntity;

    @OneToMany(() => CityEntity, (city) => city.state)
    cities: CityEntity[];
}
