import { CountryEntity } from '@app/database';
import { ApiProperty } from '@nestjs/swagger';
import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    RelationId,
    UpdateDateColumn,
} from 'typeorm';

import { StateEntity } from './state.entity';

@Entity('cities')
export class CityEntity {
    @PrimaryGeneratedColumn()
    @ApiProperty({ example: 1337 })
    public id: number;

    @Column({ type: 'varchar' })
    @ApiProperty({ example: 'Kyiv' })
    public name: string;

    @ManyToOne(() => StateEntity, (state) => state.cities)
    public state: StateEntity;

    @Column({ type: 'int' })
    @RelationId((city: CityEntity) => city.state)
    public stateId: number;

    @ManyToOne(() => CountryEntity, (country) => country.cities)
    public country: CountryEntity;

    @Column({ type: 'int' })
    @RelationId((city: CityEntity) => city.country)
    public countryId: number;

    @Column({ type: 'char', length: 2, name: 'state_code' })
    @ApiProperty({ example: '30' })
    public stateCode: string;

    @Column({ type: 'char', length: 2, name: 'country_code' })
    @ApiProperty({ example: 'UA' })
    public countryCode: string;

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
