import { S3ClientConfig } from '@aws-sdk/client-s3';
import { ConfigurableModuleBuilder } from '@nestjs/common';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN, OPTIONS_TYPE, ASYNC_OPTIONS_TYPE } =
    new ConfigurableModuleBuilder<S3ClientConfig>()
        .setClassMethodName('forRoot')
        .build();
