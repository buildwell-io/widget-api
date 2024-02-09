import { ConfirmationAction } from '@app/enums';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, RelationId } from 'typeorm';

import { AccountEntity } from './account.entity';

@Entity('confirmations')
export class ConfirmationEntity implements ConfirmationEntity {
    @PrimaryGeneratedColumn()
    @Exclude()
    @ApiHideProperty()
    public id: number;

    @ManyToOne(() => AccountEntity, (account) => account.confirmations)
    @Exclude()
    @ApiHideProperty()
    public account: AccountEntity;

    @Column({ type: 'int' })
    @RelationId((confirmation: ConfirmationEntity) => confirmation.account)
    @Exclude()
    @ApiHideProperty()
    public accountId: number;

    @Column({ type: 'enum', enum: [ ConfirmationAction.EmailConfirm, ConfirmationAction.PasswordChange ] })
    @ApiProperty({ example: ConfirmationAction.EmailConfirm })
    public action: ConfirmationAction;

    @Column({ type: 'varchar' })
    @Exclude()
    @ApiHideProperty()
    public token: string; // uuid4

    @CreateDateColumn({ type: 'timestamp with time zone' })
    @Exclude()
    @ApiHideProperty()
    public createdAt: Date;

    @Column({ type: 'timestamp with time zone' })
    @Exclude()
    @ApiHideProperty()
    public confirmedAt: Date;

    @Column({ type: 'timestamp with time zone' })
    @ApiProperty({ example: '2021-10-09T10:44:59.011Z' })
    public expiresAt: Date;
}
