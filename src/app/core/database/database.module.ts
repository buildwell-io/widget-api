import { WidgetEntity } from '@core/database';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as fs from 'fs';

import { AccountEntity } from './entities';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ ConfigModule ],
            useFactory: (configService: ConfigService) => {
                const POSTGRES_CERT_PATH = configService.get('POSTGRES_CERT_PATH');

                const ssl = POSTGRES_CERT_PATH
                    ? { ca: fs.readFileSync(POSTGRES_CERT_PATH).toString() }
                    : undefined;

                return {
                    type: 'postgres',
                    applicationName: 'db-postgresql-ams3-88358',
                    host: configService.get('POSTGRES_HOST'),
                    port: configService.get('POSTGRES_PORT'),
                    database: configService.get('POSTGRES_DATABASE'),
                    username: configService.get('POSTGRES_USERNAME'),
                    password: configService.get('POSTGRES_PASSWORD'),
                    ssl,
                    entities: [ AccountEntity, WidgetEntity ],
                    synchronize: false,
                };
            },
            inject: [ ConfigService ],
        }),
    ],
})
export class DatabaseModule {
}
