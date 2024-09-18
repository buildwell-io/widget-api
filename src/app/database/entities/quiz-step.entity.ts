import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

import { QuizEntity } from './quiz.entity';
import { QuizStepAnswerEntity } from './quiz-step-answer.entity';

@Entity('quizzes_steps')
export class QuizStepEntity {
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
        type: 'varchar',
        length: 128,
    })
    @ApiProperty({ example: 'My step' })
    title: string;

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

    @ManyToOne(() => QuizEntity, (quiz) => quiz.steps)
    @JoinColumn({ name: 'quiz_id' })
    quiz: QuizEntity;

    @OneToMany(() => QuizStepAnswerEntity, (answer) => answer.step)
    answers: QuizStepAnswerEntity[];
}
