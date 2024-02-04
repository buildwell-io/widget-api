import { CustomConfigModule } from '@core/config';
import { DatabaseModule } from '@core/database';
import {
    provideGlobalFilters,
    provideGlobalGuards,
    provideGlobalInterceptors,
    provideGlobalPipes,
} from '@core/global';
import { CustomThrottlerModule } from '@core/throttle';
import { AccountModule } from '@modules/account';
import { AuthenticationModule } from '@modules/authentication';
import { Module } from '@nestjs/common';

@Module({
    imports: [
        CustomConfigModule,
        CustomThrottlerModule,
        DatabaseModule,
        AccountModule,
        AuthenticationModule,
    ],
    providers: [
        ...provideGlobalGuards(),
        ...provideGlobalFilters(),
        ...provideGlobalInterceptors(),
        ...provideGlobalPipes(),
    ],
})
export class AppModule {
}
