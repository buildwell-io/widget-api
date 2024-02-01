import { Module } from '@nestjs/common';
import { WidgetModule } from '@modules/widget/widget.module';
import { CustomConfigModule } from '@core/config/config.module';
import { CustomThrottlerModule } from '@core/throttler.module';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
import { DatabaseModule } from '@core/database.module';

@Module({
    imports: [ CustomConfigModule, CustomThrottlerModule, DatabaseModule, WidgetModule ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard,
        },
    ],
})
export class AppModule {
}
