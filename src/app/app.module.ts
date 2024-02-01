import { Module } from '@nestjs/common';
import { WidgetModule } from '@modules/widget/widget.module';
import { CustomConfigModule } from '@core/config/config.module';
import { CustomThrottlerModule } from '@core/throttler.module';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';

@Module({
    imports: [ CustomConfigModule, CustomThrottlerModule, WidgetModule ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard,
        },
    ],
})
export class AppModule {
}
