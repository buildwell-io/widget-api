import { CustomConfigModule } from '@app/config';
import {
    AccountModule,
    AuthenticationModule,
    ConfirmationModule,
    WidgetAppModule,
    WidgetModule,
} from '@app/controllers';
import { AccountEntity, ConfirmationEntity, DatabaseModule, WidgetEntity } from '@app/database';
import {
    provideGlobalFilters,
    provideGlobalGuards,
    provideGlobalInterceptors,
    provideGlobalPipes,
} from '@app/providers';
import { AppConfirmationService, AppMailService } from '@app/services';
import { AccessTokenStrategy, RefreshTokenStrategy } from '@app/strategies';
import { CustomThrottlerModule } from '@app/throttle';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forFeature([ AccountEntity, ConfirmationEntity, WidgetEntity ]),
        ScheduleModule.forRoot(),
        CustomConfigModule,
        CustomThrottlerModule,
        DatabaseModule,
        AccountModule,
        AuthenticationModule,
        ConfirmationModule,
        WidgetModule,
        WidgetAppModule,
    ],
    providers: [
        AppMailService,
        AppConfirmationService,
        AccessTokenStrategy,
        RefreshTokenStrategy,
        ...provideGlobalGuards(),
        ...provideGlobalFilters(),
        ...provideGlobalInterceptors(),
        ...provideGlobalPipes(),
    ],
})
export class AppModule {
}
