import { AccessTokenGuard, AccountTypeGuard } from '@app/guards';
import { Provider } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

export function provideGlobalGuards(): Provider[] {
    return [
        {
            provide: APP_GUARD,
            useClass: AccessTokenGuard,
        },
        {
            provide: APP_GUARD,
            useClass: AccountTypeGuard,
        },
    ];
}
