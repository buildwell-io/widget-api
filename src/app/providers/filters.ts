import { HttpExceptionFilter } from '@app/filters';
import { Provider } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

export function provideGlobalFilters(): Provider[] {
    return [
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter,
        },
    ];
}
