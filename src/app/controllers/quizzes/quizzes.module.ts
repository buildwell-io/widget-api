import { AccountEntity, QuizEntity, QuizStepEntity } from '@app/database';
import { DBConnectionName } from '@app/enums';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { QuizzesController } from './quizzes.controller';
import { QuizzesService } from './quizzes.service';

@Module({
    imports: [ TypeOrmModule.forFeature([ AccountEntity, QuizEntity, QuizStepEntity ], DBConnectionName.PostgresSQL) ],
    controllers: [ QuizzesController ],
    providers: [ QuizzesService ],
    exports: [ QuizzesService ],
})
export class QuizzesModule {}
