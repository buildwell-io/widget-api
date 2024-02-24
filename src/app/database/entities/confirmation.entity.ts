import { ConfirmationAction } from '@app/enums';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { AccountEntity } from './account.entity';

@Entity('confirmations')
export class ConfirmationEntity implements ConfirmationEntity {
    @PrimaryGeneratedColumn()
    @Exclude()
    @ApiHideProperty()
    id: number;

    @Column({
        name: 'account_id',
        type: 'int',
    })
    @Exclude()
    @ApiHideProperty()
    accountId: number;

    @Column({
        type: 'enum',
        enum: ConfirmationAction.EmailConfirm,
    })
    @ApiProperty({ example: ConfirmationAction.EmailConfirm })
    action: ConfirmationAction;

    @Column({ type: 'uuid' })
    @Exclude()
    @ApiHideProperty()
    token: string; // uuid4

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamp with time zone',
    })
    @Exclude()
    @ApiHideProperty()
    createdAt: Date;

    @Column({
        name: 'confirmed_at',
        type: 'timestamp with time zone',
    })
    @Exclude()
    @ApiHideProperty()
    confirmedAt: Date;

    @Column({
        name: 'expires_at',
        type: 'timestamp with time zone',
    })
    @ApiProperty({ example: '2021-10-09T10:44:59.011Z' })
    expiresAt: Date;

    /* RELATIONS */

    @ManyToOne(() => AccountEntity, (account) => account.confirmations)
    @JoinColumn({ name: 'account_id' })
    account: AccountEntity;
}
