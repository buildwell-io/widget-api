import { AccountEntity, QuizStepAnswerEntity } from '@app/database';
import { DBConnectionName } from '@app/enums';
import { assert } from '@app/utilities';
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { instanceToPlain } from 'class-transformer';
import { Repository } from 'typeorm';

import { QuizzesStepsService } from '../quizzes-steps/quizzes-steps.service';
import { CreateQuizStepAnswerDTO } from './dto/create-quiz-step-answer.dto';
import { UpdateQuizStepAnswerDTO } from './dto/update-quiz-step-answer.dto';

@Injectable()
export class QuizzesStepsAnswersService {
    constructor(
        @InjectRepository(QuizStepAnswerEntity, DBConnectionName.PostgresSQL)
        private readonly quizzesStepsAnswerRepository: Repository<QuizStepAnswerEntity>,
        @InjectRepository(AccountEntity, DBConnectionName.PostgresSQL)
        private readonly accountRepository: Repository<AccountEntity>,
        private readonly quizzesStepsService: QuizzesStepsService,
    ) {}

    async create(payload: CreateQuizStepAnswerDTO, user: Express.User): Promise<QuizStepAnswerEntity> {
        const account = await this.accountRepository.findOneBy({ id: user.id });
        assert(account.hasConfirmedEmail, () => new ForbiddenException('Email is not verified'));

        const quizStep = await this.quizzesStepsService.getById(payload.stepId, user);
        const nextQuizStep = await this.quizzesStepsService.getById(payload.nextStepId, user);

        const quizStepAnswer = new QuizStepAnswerEntity();
        quizStepAnswer.step = quizStep;
        quizStepAnswer.text = payload.text;
        quizStepAnswer.nextStep = nextQuizStep;

        return this.quizzesStepsAnswerRepository.save(quizStepAnswer);
    }

    async getById(quizStepAnswerId: number): Promise<QuizStepAnswerEntity> {
        const stepAnswer = await this.quizzesStepsAnswerRepository.findOneBy({ id: quizStepAnswerId });
        assert(!!stepAnswer, () => new NotFoundException('Answer not found'));

        return stepAnswer;
    }

    async update(answerId: number, payload: UpdateQuizStepAnswerDTO): Promise<QuizStepAnswerEntity> {
        const stepAnswer = await this.quizzesStepsAnswerRepository.findOneBy({ id: answerId });
        assert(!!stepAnswer, () => new NotFoundException('Answer not found'));

        return this.quizzesStepsAnswerRepository.save({ ...instanceToPlain(stepAnswer), ...payload });
    }

    async delete(answerId: number): Promise<void> {
        const stepAnswer = await this.quizzesStepsAnswerRepository.findOneBy({ id: answerId });
        assert(!!stepAnswer, () => new NotFoundException('Answer not found'));

        await this.quizzesStepsAnswerRepository.delete({ id: answerId });
        return Promise.resolve();
    }
}
