import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy } from './strategies/access-token.strategy';
import { AccountModule } from '@modules/account/account.module';

@Module({
    imports: [ AccountModule, JwtModule.register({}) ],
    controllers: [ AuthenticationController ],
    providers: [ AuthenticationService, AccessTokenStrategy ],
})
export class AuthenticationModule {
}
