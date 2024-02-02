import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Account } from '@interfaces/account.interface';
import { Role } from '@modules/authorization/role.enum';

@Entity('account')
export class AccountEntity implements Account {
    @PrimaryGeneratedColumn({ comment: 'Unique user identifier' })
    @ApiProperty({ example: 1337 })
    public id: number;

    @Column({
        type: 'varchar',
        length: 128,
        comment: 'Account name',
    })
    @ApiProperty({ example: 'John Doe / Alphabet Inc.' })
    public name: string;

    @Column({
        type: 'varchar',
        length: 254,
        unique: true,
        comment: "Account email",
    })
    @ApiProperty({ example: 'john.doe@gmail.com' })
    public email: string;

    @Column({
        type: 'enum',
        enum: [ 'user', 'admin' ],
        default: 'user',
        comment: "Account role"
    })
    @ApiProperty({ example: 'user' })
    public role: Role;

    @Column({
        type: 'varchar',
        length: 64,
        comment: 'Hashed password',
    })
    @Exclude()
    @ApiHideProperty()
    public password: string;

    @Column({
        type: 'varchar',
        length: 64,
        nullable: true,
        comment: 'Hashed refresh token',
    })
    @Exclude()
    @ApiHideProperty()
    public refreshToken: string;

    @CreateDateColumn()
    @ApiProperty({ example: '2021-10-09T10:44:59.011Z' })
    public createdAt: Date;

    @UpdateDateColumn()
    @ApiProperty({ example: '2021-10-09T10:44:59.011Z' })
    public updatedAt: Date;
}
