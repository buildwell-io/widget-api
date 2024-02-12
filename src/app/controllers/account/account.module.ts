import { AccountEntity, ConfirmationEntity } from '@app/database';
import { AppConfirmationService } from '@app/services';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AccountController } from './account.controller';
import { AccountService } from './account.service';

@Module({
    imports: [ TypeOrmModule.forFeature([ AccountEntity, ConfirmationEntity ]) ],
    controllers: [ AccountController ],
    providers: [ AppConfirmationService, AccountService ],
    exports: [ AccountService ],
})
export class AccountModule {
}
