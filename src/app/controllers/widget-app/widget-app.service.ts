import { QuizEntity, QuizStepAnswerEntity, QuizStepEntity, WidgetEntity } from '@app/database';
import { DBConnectionName } from '@app/enums';
import { assert } from '@app/utilities';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class WidgetAppService {
    constructor(
        @InjectRepository(WidgetEntity, DBConnectionName.PostgresSQL)
        private readonly widgetRepository: Repository<WidgetEntity>,
        @InjectRepository(QuizEntity, DBConnectionName.PostgresSQL)
        private readonly quizzesRepository: Repository<QuizEntity>,
        @InjectRepository(QuizStepEntity, DBConnectionName.PostgresSQL)
        private readonly quizzesStepsRepository: Repository<QuizStepEntity>,
        @InjectRepository(QuizStepAnswerEntity, DBConnectionName.PostgresSQL)
        private readonly quizzesStepsAnswerRepository: Repository<QuizStepAnswerEntity>,
    ) {}

    async verify(key: string, referrer: string): Promise<void> {
        const widgetExists = await this.widgetRepository.existsBy({ key });
        assert(widgetExists, () => new BadRequestException());
        return Promise.resolve();
    }

    async getQuiz(quizId: number): Promise<QuizEntity> {
        return this.quizzesRepository.findOneBy({ id: quizId });
    }

    async getStep(stepId: number): Promise<QuizStepEntity> {
        return this.quizzesStepsRepository.findOneBy({ id: stepId });
    }

    async getStepAnswers(stepId: number): Promise<QuizStepAnswerEntity[]> {
        return this.quizzesStepsAnswerRepository.findBy({ stepId });
    }
}
