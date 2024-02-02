import { Module } from '@nestjs/common';
import { AccountService } from '@modules/account/account.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from '@core/database/entities/account.entity';

@Module({
    imports: [ TypeOrmModule.forFeature([ AccountEntity ]) ],
    providers: [ AccountService ],
    exports: [ AccountService ],
})
export class AccountModule {
}
