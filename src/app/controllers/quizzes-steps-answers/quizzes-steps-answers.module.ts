import { AccountEntity, QuizStepAnswerEntity } from '@app/database';
import { DBConnectionName } from '@app/enums';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { QuizzesStepsModule } from '../quizzes-steps';
import { QuizzesStepsAnswersController } from './quizzes-steps-answers.controller';
import { QuizzesStepsAnswersService } from './quizzes-steps-answers.service';

@Module({
    imports: [ QuizzesStepsModule, TypeOrmModule.forFeature([ AccountEntity, QuizStepAnswerEntity ], DBConnectionName.PostgresSQL) ],
    controllers: [ QuizzesStepsAnswersController ],
    providers: [ QuizzesStepsAnswersService ],
})
export class QuizzesStepsAnswersModule {}
