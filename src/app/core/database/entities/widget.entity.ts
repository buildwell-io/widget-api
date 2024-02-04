import { Widget } from '@core/interfaces';
import { ApiProperty } from '@nestjs/swagger';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('widget')
export class WidgetEntity implements Widget {
    @PrimaryGeneratedColumn({ comment: 'Unique user identifier' })
    @ApiProperty({ example: 1337 })
    public id: number;

    @Column({
        type: 'varchar',
        length: 128,
        comment: 'Widget name',
    })
    @ApiProperty({ example: 'My widget' })
    public name: string;

    @CreateDateColumn()
    @ApiProperty({ example: '2021-10-09T10:44:59.011Z' })
    public createdAt: Date;

    @UpdateDateColumn()
    @ApiProperty({ example: '2021-10-09T10:44:59.011Z' })
    public updatedAt: Date;
}
