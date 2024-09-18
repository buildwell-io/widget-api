import { AccountEntity, QuizStepEntity } from '@app/database';
import { DBConnectionName } from '@app/enums';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { QuizzesModule } from '../quizzes';
import { QuizzesStepsController } from './quizzes-steps.controller';
import { QuizzesStepsService } from './quizzes-steps.service';

@Module({
    imports: [ QuizzesModule, TypeOrmModule.forFeature([ AccountEntity, QuizStepEntity ], DBConnectionName.PostgresSQL) ],
    controllers: [ QuizzesStepsController ],
    providers: [ QuizzesStepsService ],
    exports: [ QuizzesStepsService ],
})
export class QuizzesStepsModule {}
