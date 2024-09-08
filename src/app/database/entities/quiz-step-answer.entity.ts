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

import { QuizStepEntity } from './quiz-step.entity';

@Entity('quizzes_steps_answers')
export class QuizStepAnswerEntity {
    @PrimaryGeneratedColumn()
    @ApiProperty({ example: 1 })
    id: number;

    @Column({
        name: 'quiz_id',
        type: 'int',
    })
    @Exclude()
    @ApiHideProperty()
    quizId: number;

    @Column({
        name: 'step_id',
        type: 'int',
    })
    @Exclude()
    @ApiHideProperty()
    stepId: number;

    @Column({
        name: 'next_step_id',
        type: 'int',
    })
    @Exclude()
    @ApiHideProperty()
    nextStepId: number;

    @Column({
        type: 'varchar',
        length: 128,
    })
    @ApiProperty({ example: 'My answer' })
    text: string;

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

    // @ManyToMany(() => QuizEntity, (quiz) => quiz.steps)
    // quiz: QuizEntity;

    @ManyToOne(() => QuizStepEntity, (step) => step.answers)
    @JoinColumn({ name: 'step_id' })
    step: QuizStepEntity;

    @ManyToOne(() => QuizStepEntity, (step) => step.answers)
    @JoinColumn({ name: 'next_step_id' })
    nextStep: QuizStepEntity;
}
