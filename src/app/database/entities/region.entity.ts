import { ApiProperty } from '@nestjs/swagger';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { CountryEntity } from './country.entity';
import { SubregionEntity } from './subregion.entity';

@Entity('regions')
export class RegionEntity {
    @PrimaryGeneratedColumn()
    @ApiProperty({ example: 1337 })
    public id: number;

    @Column({ type: 'varchar' })
    @ApiProperty({ example: 'Europe' })
    public name: string;

    @Column({
        type: 'text',
        transformer: {
            from: (raw: string): Record<string, string> => JSON.parse(raw),
            to: (processed: Record<string, string>): string => JSON.stringify(processed),
        },
    })
    @ApiProperty({ example: { 'en': 'Europe' } })
    public translations: Record<string, string>; // key is `rfc5646`

    @Column({ type: 'boolean' })
    @ApiProperty({ example: true })
    public flag: boolean;

    @Column({ type: 'varchar', name: 'wikidataid' })
    @ApiProperty({ example: 'Q46' })
    public wikiDataId: string;

    @OneToMany(() => SubregionEntity, (subregion) => subregion.region)
    public subregions: SubregionEntity[];

    @OneToMany(() => CountryEntity, (country) => country.region)
    public countries: CountryEntity[];

    @CreateDateColumn({ type: 'timestamp with time zone', name: 'created_at' })
    @ApiProperty({ example: '2021-10-09T10:44:59.011Z' })
    public createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp with time zone', name: 'updated_at' })
    @ApiProperty({ example: '2021-10-09T10:44:59.011Z' })
    public updatedAt: Date;
}
