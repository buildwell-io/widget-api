import { AccountModule } from '@app/controllers';
import { Module } from '@nestjs/common';

import { AccountBillingController } from './account-billing.controller';
import { AccountBillingService } from './account-billing.service';

@Module({
    imports: [ AccountModule ],
    controllers: [ AccountBillingController ],
    providers: [ AccountBillingService ],
})
export class AccountBillingModule {}
