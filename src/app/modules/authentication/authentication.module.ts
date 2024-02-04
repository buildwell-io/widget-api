import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AccountModule } from '../account';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { AccessTokenStrategy, RefreshTokenStrategy } from './strategies';

@Module({
    imports: [ AccountModule, JwtModule.register({}) ],
    controllers: [ AuthenticationController ],
    providers: [ AuthenticationService, AccessTokenStrategy, RefreshTokenStrategy ],
})
export class AuthenticationModule {
}
