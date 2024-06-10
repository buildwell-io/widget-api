import { AccountEntity, QuizEntity, QuizStepEntity } from '@app/database';
import { DBConnectionName } from '@app/enums';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { QuizzesModule } from '../quizzes';
import { QuizzesStepsController } from './quizzes-steps.controller';
import { QuizzesStepsService } from './quizzes-steps.service';

@Module({
    imports: [ QuizzesModule, TypeOrmModule.forFeature([ AccountEntity, QuizEntity, QuizStepEntity ], DBConnectionName.PostgresSQL) ],
    controllers: [ QuizzesStepsController ],
    providers: [ QuizzesStepsService ],
})
export class QuizzesStepsModule {}
