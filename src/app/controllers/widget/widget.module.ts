import { AccountEntity, WidgetEntity } from '@app/database';
import { DBConnectionName } from '@app/enums';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WidgetController } from './widget.controller';
import { WidgetService } from './widget.service';

@Module({
    imports: [ TypeOrmModule.forFeature([ AccountEntity, WidgetEntity ], DBConnectionName.PostgresSQL) ],
    controllers: [ WidgetController ],
    providers: [ WidgetService ],
})
export class WidgetModule {}
