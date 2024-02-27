import { AccountEntity } from '@app/database';
import { DBConnectionName } from '@app/enums';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';

@Module({
    imports: [ TypeOrmModule.forFeature([ AccountEntity ], DBConnectionName.PostgresSQL), JwtModule.register({}) ],
    controllers: [ AuthenticationController ],
    providers: [ AuthenticationService ],
})
export class AuthenticationModule {
}
