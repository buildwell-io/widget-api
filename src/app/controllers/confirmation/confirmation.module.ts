import { AccountEntity, ConfirmationEntity } from '@app/database';
import { AppConfirmationService, AppMailService } from '@app/services';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfirmationController } from './confirmation.controller';
import { ConfirmationService } from './confirmation.service';

@Module({
    imports: [ TypeOrmModule.forFeature([ AccountEntity, ConfirmationEntity ]) ],
    controllers: [ ConfirmationController ],
    providers: [ AppConfirmationService, AppMailService, ConfirmationService ],
})
export class ConfirmationModule {
}
