import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Account } from '@interfaces/account.interface';

@Entity()
export class AccountEntity implements Account {
    @ApiProperty({ example: 1337 })
    @PrimaryGeneratedColumn({ comment: 'Unique user identifier' })
    public id: number;

    @ApiProperty({ example: 'John Doe / Alphabet Inc.' })
    @Column({
        type: 'varchar',
        length: 128,
        comment: "Account name",
    })
    public name: string;

    @ApiHideProperty()
    @Exclude()
    @Column({
        type: 'varchar',
        length: 64,
        comment: 'Hashed password',
    })
    public password: string;

    @ApiProperty({ example: '2021-10-09T10:44:59.011Z' })
    @CreateDateColumn()
    public createdAt: Date;
}
