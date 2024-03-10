import { ConfigurableModuleBuilder } from '@nestjs/common';

import { StripeModuleOptions } from './types';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN, OPTIONS_TYPE, ASYNC_OPTIONS_TYPE } =
    new ConfigurableModuleBuilder<StripeModuleOptions>()
        .setClassMethodName('forRoot')
        .build();
