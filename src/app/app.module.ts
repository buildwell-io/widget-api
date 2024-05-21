import { CustomConfigModule } from '@app/config';
import {
    AccountBillingModule,
    AccountModule,
    AuthenticationModule,
    CompanyModule,
    ConfirmationModule,
    CSCModule,
    QuizzesModule,
    WidgetAppModule,
    WidgetModule,
} from '@app/controllers';
import { AccountEntity, ConfirmationEntity, DatabaseModule, WidgetEntity } from '@app/database';
import { DBConnectionName } from '@app/enums';
import {
    provideGlobalFilters,
    provideGlobalGuards,
    provideGlobalInterceptors,
    provideGlobalPipes,
} from '@app/providers';
import { AppConfirmationService, AppMailService, S3Module, StripeModule } from '@app/services';
import { AccessTokenStrategy, RefreshTokenStrategy } from '@app/strategies';
import { S3ClientConfig } from '@aws-sdk/client-s3';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forFeature([ AccountEntity, ConfirmationEntity, WidgetEntity ], DBConnectionName.PostgresSQL),
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
        S3Module.forRootAsync({
            inject: [ ConfigService ],
            useFactory: (configService: ConfigService): S3ClientConfig => ({
                endpoint: configService.get('S3_ENDPOINT'),
                credentials: {
                    accessKeyId: configService.get('S3_ACCESS_KEY'),
                    secretAccessKey: configService.get('S3_SECRET_KEY'),
                },
                region: configService.get('S3_REGION'),
            }),
        }),
        ScheduleModule.forRoot(),
        CustomConfigModule,
        DatabaseModule,
        CSCModule,
        AccountModule,
        AccountBillingModule,
        AuthenticationModule,
        ConfirmationModule,
        WidgetModule,
        WidgetAppModule,
        CompanyModule,
        QuizzesModule,
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
