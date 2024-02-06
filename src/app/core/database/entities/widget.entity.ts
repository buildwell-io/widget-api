import { Account, Widget } from '@core/interfaces';
import { ApiProperty } from '@nestjs/swagger';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn, RelationId,
    UpdateDateColumn,
} from 'typeorm';

import { AccountEntity } from './account.entity';

@Entity('widget')
export class WidgetEntity implements Widget {
    @PrimaryGeneratedColumn()
    @ApiProperty({ example: 1337 })
    public id: number;

    @Column({ type: 'varchar', length: 128 })
    @ApiProperty({ example: 'My widget' })
    public name: string;

    @ManyToOne(() => AccountEntity, (account) => account.widgets, { cascade: true })
    public owner: Account;

    @RelationId((widget: Widget) => widget.owner)
    public ownerId: number;

    @CreateDateColumn()
    @ApiProperty({ example: '2021-10-09T10:44:59.011Z' })
    public createdAt: Date;

    @UpdateDateColumn()
    @ApiProperty({ example: '2021-10-09T10:44:59.011Z' })
    public updatedAt: Date;
}
