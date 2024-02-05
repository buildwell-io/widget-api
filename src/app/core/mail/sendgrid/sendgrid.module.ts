import { DynamicModule, Module } from '@nestjs/common';
import SendGrid from '@sendgrid/mail';

import { SENDGRID_OPTIONS } from './constants';
import { SendGridModuleAsyncOptions, SendGridOptions } from './interfaces';

@Module({})
export class SendgridModule {
    static forRoot(options: SendGridOptions): DynamicModule {
        SendGrid.setApiKey(options.apiKey);

        return {
            module: SendgridModule,
            providers: [
                {
                    provide: SENDGRID_OPTIONS,
                    useValue: SendGrid,
                },
            ],
        };
    }

    static forRootAsync(options: SendGridModuleAsyncOptions): DynamicModule {
        return {
            module: SendgridModule,
            imports: options.imports,
            providers: [
                {
                    provide: SENDGRID_OPTIONS,
                    useFactory: options.useFactory,
                    inject: options.inject,
                },
            ],
        };
    }
}
