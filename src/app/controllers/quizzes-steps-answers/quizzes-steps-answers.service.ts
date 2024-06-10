import { QuizEntity, QuizStepAnswerEntity } from '@app/database';
import { DBConnectionName } from '@app/enums';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class QuizzesStepsService {
    constructor(
        @InjectRepository(QuizStepAnswerEntity, DBConnectionName.PostgresSQL)
        private readonly quizzesStepsAnswerRepository: Repository<QuizStepAnswerEntity>,
    ) {}

    async create(): Promise<QuizStepAnswerEntity> {

    }

    async getById(quizStepAnswerId: number): Promise<QuizStepAnswerEntity> {}

    async getAll(): Promise<QuizStepAnswerEntity[]> {}

    async updateById(): Promise<QuizStepAnswerEntity> {}

    async deleteById(): Promise<void> {}
}
