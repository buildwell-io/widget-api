import { QuizStepAnswerEntity } from '@app/database';
import { DBConnectionName } from '@app/enums';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { QuizzesStepsAnswersController } from './quizzes-steps-answers.controller';
import { QuizzesStepsService } from './quizzes-steps-answers.service';

@Module({
    imports: [ TypeOrmModule.forFeature([ QuizStepAnswerEntity ], DBConnectionName.PostgresSQL) ],
    controllers: [ QuizzesStepsAnswersController ],
    providers: [ QuizzesStepsService ],
})
export class QuizzesStepsAnswersModule {}
