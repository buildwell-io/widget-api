import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as fs from 'fs';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ ConfigModule ],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                applicationName: 'db-postgresql-ams3-88358',
                host: configService.get('POSTGRES_HOST'),
                port: configService.get('POSTGRES_PORT'),
                database: configService.get('POSTGRES_DATABASE'),
                username: configService.get('POSTGRES_USERNAME'),
                password: configService.get('POSTGRES_PASSWORD'),
                ssl: {
                    ca: fs.readFileSync(configService.get('POSTGRES_CERT_PATH')).toString(),
                },
                entities: [],
            }),
            inject: [ ConfigService ],
        }),
    ],
})
export class DatabaseModule {
}
