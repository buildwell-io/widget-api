import { ModuleMetadata } from '@nestjs/common';

export interface SendGridOptions {
    readonly apiKey: string;
}

export interface SendGridModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
    useFactory?: (...args: any[]) => Promise<SendGridOptions> | SendGridOptions;
    inject?: any[];
}
