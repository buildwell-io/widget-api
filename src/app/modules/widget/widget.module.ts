import { WidgetEntity } from '@core/database';
import { AccountModule } from '@modules/account';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WidgetController } from './widget.controller';
import { WidgetService } from './widget.service';

@Module({
    imports: [ AccountModule, TypeOrmModule.forFeature([ WidgetEntity ]) ],
    controllers: [ WidgetController ],
    providers: [ WidgetService ],
})
export class WidgetModule {}
