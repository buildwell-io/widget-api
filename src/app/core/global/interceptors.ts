import { ClassSerializerInterceptor, Provider } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

export function provideGlobalInterceptors(): Provider[] {
    return [
        {
            provide: APP_INTERCEPTOR,
            useClass: ClassSerializerInterceptor,
        },
    ];
}
