import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    RelationId,
    UpdateDateColumn,
} from 'typeorm';

import { AccountEntity } from './account.entity';

@Entity('widgets')
export class WidgetEntity {
    @PrimaryGeneratedColumn()
    @ApiProperty({ example: 1337 })
    public id: number;

    @Column({ type: 'varchar' })
    @ApiProperty({ example: 'My widget' })
    public name: string;

    @ManyToOne(() => AccountEntity, (account) => account.widgets)
    @Exclude()
    @ApiHideProperty()
    public owner: AccountEntity;

    @Column({ type: 'int' })
    @RelationId((widget: WidgetEntity) => widget.owner)
    @Exclude()
    @ApiHideProperty()
    public ownerId: number;

    @Column({ type: 'uuid' })
    @Exclude()
    @ApiHideProperty()
    public key: string; // uuid4

    @CreateDateColumn({ type: 'timestamp with time zone' })
    @ApiProperty({ example: '2021-10-09T10:44:59.011Z' })
    public createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp with time zone' })
    @ApiProperty({ example: '2021-10-09T10:44:59.011Z' })
    public updatedAt: Date;
}
