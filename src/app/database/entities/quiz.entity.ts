import { AccountEntity } from '@app/database';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne, OneToMany, OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

import { QuizStepEntity } from './quiz-step.entity';

@Entity('quizzes')
export class QuizEntity {
    @PrimaryGeneratedColumn()
    @ApiProperty({ example: 1 })
    id: number;

    @Column({
        name: 'owner_id',
        type: 'int',
    })
    @Exclude()
    @ApiHideProperty()
    ownerId: number;

    @Column({
        type: 'varchar',
        length: 128,
    })
    @ApiProperty({ example: 'My quiz' })
    name: string;

    @Column({
        name: 'first_step_id',
        type: 'int',
    })
    firstStepId: number;

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

    @ManyToOne(() => AccountEntity, (account) => account.quizzes)
    @JoinColumn({ name: 'owner_id' })
    owner: AccountEntity;

    @OneToOne(() => QuizStepEntity)
    @JoinColumn({ name: 'first_step_id' })
    firstStep: QuizStepEntity;

    @OneToMany(() => QuizStepEntity, (quiz) => quiz.quiz)
    steps: QuizStepEntity[];
}
