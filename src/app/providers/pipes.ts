import { Provider, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';

export function provideGlobalPipes(): Provider[] {
    return [
        {
            provide: APP_PIPE,
            useClass: ValidationPipe,
        },
    ];
}
