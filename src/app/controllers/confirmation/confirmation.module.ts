import { AccountEntity, ConfirmationEntity } from '@app/database';
import { DBConnectionName } from '@app/enums';
import { AppConfirmationService, AppMailService } from '@app/services';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfirmationController } from './confirmation.controller';
import { ConfirmationService } from './confirmation.service';

@Module({
    imports: [ TypeOrmModule.forFeature([ AccountEntity, ConfirmationEntity ], DBConnectionName.PostgresSQL) ],
    controllers: [ ConfirmationController ],
    providers: [ AppConfirmationService, AppMailService, ConfirmationService ],
})
export class ConfirmationModule {
}
