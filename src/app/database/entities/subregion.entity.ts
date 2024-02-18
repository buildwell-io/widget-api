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

import { CountryEntity } from './country.entity';

@Entity('subregions')
export class SubregionEntity {
    @PrimaryGeneratedColumn()
    @ApiProperty({ example: 1337 })
    public id: number;

    @Column({ type: 'varchar' })
    @ApiProperty({ example: 'Eastern Europe' })
    public name: string;

    @Column({
        type: 'text',
        transformer: {
            from: (raw: string): Record<string, string> => JSON.parse(raw),
            to: (processed: Record<string, string>): string => JSON.stringify(processed),
        },
    })
    @ApiProperty({ example: { 'en': 'Eastern Europe' } })
    public translations: Record<string, string>; // key is `rfc5646`

    @Column({ type: 'boolean' })
    @ApiProperty({ example: true })
    public flag: boolean;

    @ManyToOne(() => RegionEntity, (region) => region.subregions)
    public region: RegionEntity;

    @Column({ type: 'int' })
    @RelationId((subregion: SubregionEntity) => subregion.region)
    public regionId: number;

    @OneToMany(() => CountryEntity, (country) => country.subregion)
    public countries: CountryEntity[];

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
