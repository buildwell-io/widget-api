import { CountryEntity } from '@app/database';
import { ApiProperty } from '@nestjs/swagger';
import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    RelationId,
    UpdateDateColumn,
} from 'typeorm';

import { CityEntity } from './city.entity';

@Entity('states')
export class StateEntity {
    @PrimaryGeneratedColumn()
    @ApiProperty({ example: 1337 })
    public id: number;

    @Column({ type: 'varchar' })
    @ApiProperty({ example: 'Washington' })
    public name: string;

    @ManyToOne(() => CountryEntity, (country) => country.states)
    public country: CountryEntity;

    @Column({ type: 'int' })
    @RelationId((state: StateEntity) => state.country)
    public countryId: number;

    @OneToMany(() => CityEntity, (city) => city.state)
    public cities: CityEntity[];

    @Column({ type: 'char', length: 2, name: 'country_code' })
    @ApiProperty({ example: 'UA' })
    public countryCode: string;

    @Column({ type: 'varchar' })
    public iso2: string;

    @Column({ type: 'varchar', name: 'fips_code' })
    public fipsCode: string;

    @Column({ type: 'varchar' })
    @ApiProperty({ example: 'region' })
    public type: string;

    @Column({ type: 'numeric', precision: 10, scale: 8 })
    @ApiProperty({ example: '33.00000000' })
    public latitude: number;

    @Column({ type: 'numeric', precision: 11, scale: 8 })
    @ApiProperty({ example: '65.00000000' })
    public longitude: number;

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
