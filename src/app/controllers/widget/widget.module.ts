import { AccountEntity, WidgetEntity } from '@app/database';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WidgetController } from './widget.controller';
import { WidgetService } from './widget.service';

@Module({
    imports: [ TypeOrmModule.forFeature([ AccountEntity, WidgetEntity ]) ],
    controllers: [ WidgetController ],
    providers: [ WidgetService ],
})
export class WidgetModule {}
