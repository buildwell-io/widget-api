import { Module } from '@nestjs/common';

import { WidgetAppController } from './widget-app.controller';
import { WidgetAppService } from './widget-app.service';

@Module({
    controllers: [ WidgetAppController ],
    providers: [ WidgetAppService ],
})
export class WidgetAppModule {}
