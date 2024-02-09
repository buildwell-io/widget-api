import { AccountEntity } from '@app/database';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AccountController } from './account.controller';
import { AccountService } from './account.service';

@Module({
    imports: [ TypeOrmModule.forFeature([ AccountEntity ]) ],
    controllers: [ AccountController ],
    providers: [ AccountService ],
    exports: [ AccountService ],
})
export class AccountModule {
}
