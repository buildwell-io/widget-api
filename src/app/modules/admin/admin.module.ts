import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AccountEntity } from '@core/database/entities/account.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [ TypeOrmModule.forFeature([ AccountEntity ]) ],
    controllers: [ AdminController ],
    providers: [ AdminService ],
})
export class AdminModule {
}
