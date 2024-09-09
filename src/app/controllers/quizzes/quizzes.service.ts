import { AccountEntity, QuizEntity } from '@app/database';
import { DBConnectionName } from '@app/enums';
import { assert } from '@app/utilities';
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { instanceToPlain } from 'class-transformer';
import { Repository } from 'typeorm';

import { CreateQuizDTO } from './dto/create-quiz.dto';
import { UpdateQuizDTO } from './dto/update-quiz.dto';

@Injectable()
export class QuizzesService {
    constructor(
        @InjectRepository(QuizEntity, DBConnectionName.PostgresSQL)
        private readonly quizzesRepository: Repository<QuizEntity>,
        @InjectRepository(AccountEntity, DBConnectionName.PostgresSQL)
        private readonly accountRepository: Repository<AccountEntity>,
    ) {}

    async create(payload: CreateQuizDTO, { id }: Express.User): Promise<QuizEntity> {
        const account = await this.accountRepository.findOneBy({ id });
        assert(account.hasConfirmedEmail, () => new ForbiddenException('Email is not verified'));

        const quiz = new QuizEntity();
        quiz.name = payload.name;
        quiz.owner = account;

        return this.quizzesRepository.save(quiz);
    }

    async getAll(user: Express.User): Promise<QuizEntity[]> {
        return this.quizzesRepository.findBy({ ownerId: user.id });
    }

    async getById(quizId: number, user: Express.User): Promise<QuizEntity> {
        const quiz = await this.quizzesRepository.findOneBy({ id: quizId });
        assert(!!quiz, () => new NotFoundException('Quiz not found'));
        assert(quiz.ownerId === user.id, () => new ForbiddenException('You are not an owner'));
        return quiz;
    }

    async update(quizId: number, payload: UpdateQuizDTO, user: Express.User): Promise<QuizEntity> {
        const quiz = await this.quizzesRepository.findOneBy({ id: quizId });
        assert(!!quiz, () => new NotFoundException('Quiz not found'));
        assert(quiz.ownerId === user.id, () => new ForbiddenException('You are not an owner'));
        return this.quizzesRepository.save({ ...instanceToPlain(quiz), ...payload });
    }

    async delete(quizId: number, user: Express.User): Promise<void> {
        const quiz = await this.quizzesRepository.findOneBy({ id: quizId });
        assert(!!quiz, () => new NotFoundException('Quiz not found'));
        assert(quiz.ownerId === user.id, () => new ForbiddenException('You are not an owner'));
        await this.quizzesRepository.delete({ id: quizId });
        return Promise.resolve();
    }
}
