import { AccountEntity, QuizEntity } from '@app/database';
import { DBConnectionName } from '@app/enums';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { QuizzesController } from './quizzes.controller';
import { QuizzesService } from './quizzes.service';

@Module({
    imports: [ TypeOrmModule.forFeature([ AccountEntity, QuizEntity ], DBConnectionName.PostgresSQL) ],
    controllers: [ QuizzesController ],
    providers: [ QuizzesService ],
    exports: [ QuizzesService ],
})
export class QuizzesModule {}
