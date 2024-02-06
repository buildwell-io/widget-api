import { Account } from '@core/interfaces';
import { Role } from '@modules/authorization';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('account')
export class AccountEntity implements Account {
    @PrimaryGeneratedColumn({ comment: 'Unique user identifier' })
    @ApiProperty({ example: 1337 })
    public id: number;

    @Column({ type: 'varchar', length: 128 })
    @ApiProperty({ example: 'John Doe / Alphabet Inc.' })
    public name: string;

    @Column({ type: 'varchar', length: 254, unique: true })
    @ApiProperty({ example: 'john.doe@gmail.com' })
    public email: string;

    @Column({ type: 'enum', enum: [ Role.User, Role.Admin ], default: Role.User })
    @ApiProperty({ example: Role.User })
    public role: Role;

    @Column({ type: 'varchar', length: 32, nullable: true, default: true })
    @Exclude()
    @ApiHideProperty()
    public totpSecret: string | null;

    @Column({ type: 'bigint', nullable: true, default: null })
    @Exclude()
    @ApiHideProperty()
    public totpCreatedAt: number | null;

    @Column({ type: 'boolean', default: false })
    public isEmailVerified: boolean;

    @Column({ type: 'varchar', length: 64 })
    @Exclude()
    @ApiHideProperty()
    public password: string;

    @Column({ type: 'varchar', length: 64, nullable: true, default: null })
    @Exclude()
    @ApiHideProperty()
    public refreshToken: string | null;

    @CreateDateColumn()
    @ApiProperty({ example: '2021-10-09T10:44:59.011Z' })
    public createdAt: Date;

    @UpdateDateColumn()
    @ApiProperty({ example: '2021-10-09T10:44:59.011Z' })
    public updatedAt: Date;
}
