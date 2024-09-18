import { AccountEntity, QuizStepAnswerEntity, QuizStepEntity } from '@app/database';
import { DBConnectionName } from '@app/enums';
import { assert } from '@app/utilities';
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { instanceToPlain } from 'class-transformer';
import { Repository } from 'typeorm';

import { QuizzesService } from '../quizzes/quizzes.service';
import { CreateQuizStepDTO } from './dto/create-quiz-step.dto';
import { UpdateQuizStepDTO } from './dto/update-quiz-step.dto';

@Injectable()
export class QuizzesStepsService {
    constructor(
        @InjectRepository(QuizStepEntity, DBConnectionName.PostgresSQL)
        private readonly quizzesStepsRepository: Repository<QuizStepEntity>,
        @InjectRepository(QuizStepAnswerEntity, DBConnectionName.PostgresSQL)
        private readonly quizzesStepsAnswersRepository: Repository<QuizStepAnswerEntity>,
        @InjectRepository(AccountEntity, DBConnectionName.PostgresSQL)
        private readonly accountRepository: Repository<AccountEntity>,
        private readonly quizzesService: QuizzesService,
    ) {}

    async create(payload: CreateQuizStepDTO, user: Express.User): Promise<QuizStepEntity> {
        const account = await this.accountRepository.findOneBy({ id: user.id });
        assert(account.hasConfirmedEmail, () => new ForbiddenException('Email is not verified'));

        const quiz = await this.quizzesService.getById(payload.quizId, user);

        const quizStep = new QuizStepEntity();
        quizStep.title = payload.title;
        quizStep.quiz = quiz;

        return this.quizzesStepsRepository.save(quizStep);
    }

    async getById(quizStepId: number, user: Express.User): Promise<QuizStepEntity> {
        const quizStep = await this.quizzesStepsRepository.findOneBy({ id: quizStepId });
        assert(!!quizStep, () => new NotFoundException('Step not found'));

        // Check for existing and owning
        await this.quizzesService.getById(quizStep.quizId, user);

        return quizStep;
    }

    async update(quizStepId: number, payload: UpdateQuizStepDTO, user: Express.User): Promise<QuizStepEntity> {
        const quizStep = await this.quizzesStepsRepository.findOneBy({ id: quizStepId });
        assert(!!quizStep, () => new NotFoundException('Step not found'));

        // Check for existing and owning
        await this.quizzesService.getById(quizStep.quizId, user);

        return this.quizzesStepsRepository.save({ ...instanceToPlain(quizStep), ...payload });
    }

    async delete(quizStepId: number, user: Express.User): Promise<void> {
        const quizStep = await this.quizzesStepsRepository.findOneBy({ id: quizStepId });
        assert(!!quizStep, () => new NotFoundException('Step not found'));

        // Check for existing and owning
        await this.quizzesService.getById(quizStep.quizId, user);

        await this.quizzesStepsRepository.delete({ id: quizStepId });
        return Promise.resolve();
    }

    async getAnswers(quizStepId: number, user: Express.User): Promise<QuizStepAnswerEntity[]> {
        const quizStep = await this.quizzesStepsRepository.findOneBy({ id: quizStepId });
        assert(!!quizStep, () => new NotFoundException('Step not found'));

        // Check for existing and owning
        await this.quizzesService.getById(quizStep.quizId, user);

        return this.quizzesStepsAnswersRepository.findBy({ stepId: quizStepId });
    }
}
