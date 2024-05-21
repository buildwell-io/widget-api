import { DBConnectionName } from '@app/enums';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as fs from 'fs';
import { MongoConnectionOptions } from 'typeorm/driver/mongodb/MongoConnectionOptions';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

import {
    AccountEntity,
    CityEntity,
    ConfirmationEntity,
    CountryEntity,
    RegionEntity,
    StateEntity,
    SubregionEntity,
    WidgetEntity,
} from './entities';
import { QuizEntity } from './entities/quiz.entity';
import { QuizStepEntity } from './entities/quiz-step.entity';
import { QuizStepAnswerEntity } from './entities/quiz-step-answer.entity';

@Module({
    imports: [
        /* PostgreSQL */
        TypeOrmModule.forRootAsync({
            imports: [ ConfigModule ],
            name: DBConnectionName.PostgresSQL,
            useFactory: (configService: ConfigService): PostgresConnectionOptions => {
                const POSTGRES_CERT_PATH = configService.get('POSTGRES_CERT_PATH');

                const ssl = POSTGRES_CERT_PATH
                    ? { ca: fs.readFileSync(POSTGRES_CERT_PATH).toString() }
                    : undefined;

                return {
                    type: 'postgres',
                    applicationName: 'db-postgresql',
                    host: configService.get('POSTGRES_HOST'),
                    port: configService.get('POSTGRES_PORT'),
                    database: configService.get('POSTGRES_DATABASE'),
                    username: configService.get('POSTGRES_USERNAME'),
                    password: configService.get('POSTGRES_PASSWORD'),
                    ssl,
                    entities: [
                        RegionEntity,
                        SubregionEntity,
                        CountryEntity,
                        StateEntity,
                        CityEntity,
                        AccountEntity,
                        ConfirmationEntity,
                        WidgetEntity,
                        QuizEntity,
                        QuizStepEntity,
                        QuizStepAnswerEntity,
                    ],
                    synchronize: false,
                };
            },
            inject: [ ConfigService ],
        }),

        /* MongoDB */
        TypeOrmModule.forRootAsync({
            imports: [ ConfigModule ],
            name: DBConnectionName.MongoDB,
            useFactory: (configService: ConfigService): MongoConnectionOptions => {
                return {
                    type: 'mongodb',
                    appname: 'db-mongodb',
                    url: configService.get('MONGO_URL'),
                    entities: [],
                    synchronize: false,
                    useUnifiedTopology: true,
                    useNewUrlParser: true,
                };
            },
            inject: [ ConfigService ],
        }),
    ],
})
export class DatabaseModule {
}
