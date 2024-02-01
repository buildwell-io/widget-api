import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
    imports: [
        ThrottlerModule.forRootAsync({
            imports: [ ConfigModule ],
            useFactory: (config: ConfigService) => (
                [
                    {
                        ttl: config.get('THROTTLE_TTL'),
                        limit: config.get('THROTTLE_LIMIT'),
                    },
                ]
            ),
            inject: [ ConfigService ],
        }),
    ],
    exports: [ ThrottlerModule ],
})
export class CustomThrottlerModule {
}
