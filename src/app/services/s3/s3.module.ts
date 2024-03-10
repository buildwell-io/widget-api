import { Global, Module } from '@nestjs/common';

import { ConfigurableModuleClass } from './s3.module-definition';
import { S3Service } from './s3.service';

@Global()
@Module({
    providers: [ S3Service ],
    exports: [ S3Service ],
})
export class S3Module extends ConfigurableModuleClass {}
