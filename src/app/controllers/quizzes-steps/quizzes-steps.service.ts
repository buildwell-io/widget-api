import { AccountEntity, QuizEntity, QuizStepEntity } from '@app/database';
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
        @InjectRepository(QuizEntity, DBConnectionName.PostgresSQL)
        private readonly quizzesRepository: Repository<QuizEntity>,
        @InjectRepository(QuizStepEntity, DBConnectionName.PostgresSQL)
        private readonly quizzesStepsRepository: Repository<QuizStepEntity>,
        @InjectRepository(AccountEntity, DBConnectionName.PostgresSQL)
        private readonly accountRepository: Repository<AccountEntity>,
        private readonly quizzesService: QuizzesService,
    ) {}

    async create(quizId: number, payload: CreateQuizStepDTO, user: Express.User): Promise<QuizStepEntity> {
        const account = await this.accountRepository.findOneBy({ id: user.id });
        assert(account.hasConfirmedEmail, () => new ForbiddenException('Email is not verified'));

        const quiz = await this.quizzesService.getById(quizId, user);

        const quizStep = new QuizStepEntity();
        quizStep.title = payload.title;
        quizStep.type = payload.type;
        quizStep.quiz = quiz;

        return this.quizzesStepsRepository.save(quizStep);
    }

    async getAll(quizId: number, user: Express.User): Promise<QuizStepEntity[]> {
        // Check for existing and owning
        await this.quizzesService.getById(quizId, user);

        return this.quizzesStepsRepository.findBy({ quizId });
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
}
