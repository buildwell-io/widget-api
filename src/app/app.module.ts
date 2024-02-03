import { Module } from '@nestjs/common';
import { CustomConfigModule } from '@core/config/config.module';
import { CustomThrottlerModule } from '@core/throttler.module';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
import { DatabaseModule } from '@core/database/database.module';
import { AuthenticationModule } from '@modules/authentication/authentication.module';
import { AccessTokenGuard } from '@modules/authentication/guards/access-token.guard';
import { RoleGuard } from '@modules/authorization/role.guard';
import { AccountModule } from '@modules/account/account.module';
import { WidgetModule } from '@modules/widget/widget.module';

@Module({
    imports: [
        CustomConfigModule,
        CustomThrottlerModule,
        DatabaseModule,
        AccountModule,
        AuthenticationModule,
        WidgetModule,
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard,
        },
        {
            provide: APP_GUARD,
            useClass: AccessTokenGuard,
        },
        {
            provide: APP_GUARD,
            useClass: RoleGuard,
        },
    ],
})
export class AppModule {
}
