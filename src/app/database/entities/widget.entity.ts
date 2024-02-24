import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

import { AccountEntity } from './account.entity';

@Entity('widgets')
export class WidgetEntity {
    @PrimaryGeneratedColumn()
    @ApiProperty({ example: 1 })
    id: number;

    @Column({
        type: 'varchar',
        length: 128,
    })
    @ApiProperty({ example: 'My widget' })
    name: string;

    @Column({
        name: 'owner_id',
        type: 'int',
    })
    @Exclude()
    @ApiHideProperty()
    ownerId: number;

    @Column({ type: 'uuid' })
    @Exclude()
    @ApiHideProperty()
    key: string; // uuid4

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

    @ManyToOne(() => AccountEntity, (account) => account.widgets)
    @JoinColumn({ name: 'owner_id' })
    owner: AccountEntity;
}
