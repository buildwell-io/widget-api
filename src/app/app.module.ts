import { CustomConfigModule } from '@app/config';
import {
    AccountModule,
    AuthenticationModule, CompanyModule,
    ConfirmationModule,
    CSCModule,
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
import { AppConfirmationService, AppMailService, StripeModule } from '@app/services';
import { AccessTokenStrategy, RefreshTokenStrategy } from '@app/strategies';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forFeature([ AccountEntity, ConfirmationEntity, WidgetEntity ]),
        StripeModule.forRootAsync({
            inject: [ ConfigService ],
            useFactory: (configService: ConfigService) => ({
                apiKey: configService.get('STRIPE_API_KEY'),
                options: {
                    apiVersion: configService.get('STRIPE_API_VERSION'),
                    typescript: true,
                    telemetry: true,
                },
            }),
        }),
        ScheduleModule.forRoot(),
        CustomConfigModule,
        DatabaseModule,
        CSCModule,
        AccountModule,
        AuthenticationModule,
        ConfirmationModule,
        WidgetModule,
        WidgetAppModule,
        CompanyModule,
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
