import { Provider, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';

export function provideGlobalPipes(): Provider[] {
    return [
        {
            provide: APP_PIPE,
            useFactory: () => {
                return new ValidationPipe({
                    disableErrorMessages: true,
                    stopAtFirstError: true,
                    transform: true,
                    whitelist: true,
                    forbidNonWhitelisted: true,
                    transformOptions: {
                        enableImplicitConversion: true,
                    },
                });
            },
        },
    ];
}
