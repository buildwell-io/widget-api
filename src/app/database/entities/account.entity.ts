import { AccountType } from '@app/enums';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { ConfirmationEntity } from './confirmation.entity';
import { WidgetEntity } from './widget.entity';

@Entity('accounts')
export class AccountEntity {
    @PrimaryGeneratedColumn()
    @ApiProperty({ example: 1 })
    id: number;

    @Column({
        type: 'varchar',
        length: 128,
    })
    @ApiProperty({ example: 'John Doe / Alphabet Inc.' })
    name: string;

    @Column({
        type: 'varchar',
        length: 255,
        unique: true,
    })
    @ApiProperty({ example: 'john.doe@gmail.com' })
    email: string;

    @Column({
        type: 'enum',
        enum: AccountType,
        default: AccountType.Client,
    })
    @ApiProperty({ example: AccountType.Client })
    type: AccountType;

    @Column({
        name: 'has_confirmed_email',
        type: 'boolean',
        default: false,
    })
    hasConfirmedEmail: boolean;

    @Column({
        type: 'varchar',
        length: 64,
    })
    @Exclude()
    @ApiHideProperty()
    password: string;

    @Column({
        name: 'profile_photo_id',
        type: 'uuid',
        nullable: true,
    })
    @ApiProperty({ example: '66aec774-2778-4363-ada3-628df95304d8' })
    profilePhotoID: string;

    @Column({
        name: 'refresh_token',
        type: 'varchar',
        length: 64,
        nullable: true,
    })
    @Exclude()
    @ApiHideProperty()
    refreshToken: string | null;

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamp with time zone',
    })
    @ApiProperty({ example: '2021-10-09T10:44:59.011Z' })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'updated_at',
        type: 'timestamp with time zone',
    })
    @ApiProperty({ example: '2021-10-09T10:44:59.011Z' })
    updatedAt: Date;

    /* RELATIONS */

    @OneToMany(() => WidgetEntity, (widget) => widget.owner)
    widgets: WidgetEntity[];

    @OneToMany(() => ConfirmationEntity, (confirmation) => confirmation.account)
    confirmations: ConfirmationEntity[];
}
