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

@Module({
    imports: [
        /* PostgreSQL */
        TypeOrmModule.forRootAsync({
            imports: [ ConfigModule ],
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
                    ],
                    synchronize: false,
                };
            },
            inject: [ ConfigService ],
        }),

        /* MongoDB */
        TypeOrmModule.forRootAsync({
            imports: [ ConfigModule ],
            useFactory: (configService: ConfigService): MongoConnectionOptions => {
                return {
                    type: 'mongodb',
                    appname: 'db-mongodb',
                    url: configService.get('MONGO_URL'),
                    database: configService.get('MONGO_DATABASE'),
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
