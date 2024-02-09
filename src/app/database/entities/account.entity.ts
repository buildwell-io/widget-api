import { AccountRole } from '@app/enums';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { ConfirmationEntity } from './confirmation.entity';
import { WidgetEntity } from './widget.entity';

@Entity('accounts')
export class AccountEntity {
    @PrimaryGeneratedColumn()
    @ApiProperty({ example: 1337 })
    public id: number;

    @Column({ type: 'varchar' })
    @ApiProperty({ example: 'John Doe / Alphabet Inc.' })
    public name: string;

    @Column({ type: 'varchar' })
    @ApiProperty({ example: 'john.doe@gmail.com' })
    public email: string;

    @Column({ type: 'enum', enum: [ AccountRole.User, AccountRole.Admin ] })
    @ApiProperty({ example: AccountRole.User })
    public role: AccountRole;

    @Column({ type: 'boolean' })
    public hasConfirmedEmail: boolean;

    @Column({ type: 'varchar' })
    @Exclude()
    @ApiHideProperty()
    public password: string;

    @Column({ type: 'varchar' })
    @Exclude()
    @ApiHideProperty()
    public refreshToken: string | null;

    @CreateDateColumn({ type: 'timestamp with time zone' })
    @ApiProperty({ example: '2021-10-09T10:44:59.011Z' })
    public createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp with time zone' })
    @ApiProperty({ example: '2021-10-09T10:44:59.011Z' })
    public updatedAt: Date;

    @OneToMany(() => WidgetEntity, (widget) => widget.owner)
    public widgets: WidgetEntity[];

    /*@RelationId((account: Account) => account.widgets)
    public widgetIds: number[];*/

    @OneToMany(() => ConfirmationEntity, (confirmation) => confirmation.account)
    public confirmations: ConfirmationEntity[];

    /*@RelationId((account: Account) => account.confirmations)
    public confirmationIds: number[];*/
}
