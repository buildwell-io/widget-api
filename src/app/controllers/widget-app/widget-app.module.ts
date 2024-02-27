import { WidgetEntity } from '@app/database';
import { DBConnectionName } from '@app/enums';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WidgetAppController } from './widget-app.controller';
import { WidgetAppService } from './widget-app.service';

@Module({
    imports: [ TypeOrmModule.forFeature([ WidgetEntity ], DBConnectionName.PostgresSQL), JwtModule.register({}) ],
    controllers: [ WidgetAppController ],
    providers: [ WidgetAppService ],
})
export class WidgetAppModule {}
