import { AccountEntity } from '@core/database';
import { MailModule } from '@core/mail';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AccountController } from './account.controller';
import { AccountService } from './account.service';

@Module({
    imports: [ TypeOrmModule.forFeature([ AccountEntity ]), MailModule ],
    controllers: [ AccountController ],
    providers: [ AccountService ],
    exports: [ AccountService ],
})
export class AccountModule {
}
