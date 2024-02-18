import { CountryEntity } from '@app/database';
import { ApiProperty } from '@nestjs/swagger';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

import { StateEntity } from './state.entity';

@Entity('cities')
export class CityEntity {
    @PrimaryGeneratedColumn()
    @ApiProperty({
        description: 'The unique identifier of the city',
        example: 1,
    })
    id: number;

    @Column({
        type: 'varchar',
        length: 255,
    })
    @ApiProperty({
        description: 'The name of the city',
        maxLength: 255,
        example: 'Los Angeles',
    })
    name: string;

    @Column({
        type: 'int',
        name: 'state_id',
    })
    @ApiProperty({
        description: 'The ID of the associated state',
        example: 1,
    })
    stateId: number;

    @Column({
        name: 'state_code',
        type: 'varchar',
        length: 255,
    })
    @ApiProperty({
        description: 'The code of the associated state',
        maxLength: 255,
        example: 'CA',
    })
    stateCode: string;

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
        type: 'numeric',
        precision: 10,
        scale: 8,
    })
    @ApiProperty({
        description: 'The latitude of the city',
        example: 34.0522,
    })
    latitude: number;

    @Column({
        type: 'numeric',
        precision: 11,
        scale: 8,
    })
    @ApiProperty({
        description: 'The longitude of the city',
        example: -118.2437,
    })
    longitude: number;

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamp with time zone',
        nullable: true,
    })
    @ApiProperty({
        description: 'The creation date of the city record',
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
        description: 'The last update date of the city record',
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
        description: 'Flag indicating whether the city is active',
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
        description: 'Wikidata ID of the city',
        maxLength: 255,
        example: 'Q65',
        nullable: true,
    })
    wikiDataId: string | null;

    /* RELATIONS */

    @ManyToOne(() => StateEntity, (state) => state.cities)
    @JoinColumn({ name: 'state_id' })
    state: StateEntity;

    @ManyToOne(() => CountryEntity, (country) => country.cities)
    @JoinColumn({ name: 'country_id' })
    country: CountryEntity;
}
