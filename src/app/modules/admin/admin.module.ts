import { AccountEntity } from '@core/database/entities/account.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
    imports: [ TypeOrmModule.forFeature([ AccountEntity ]) ],
    controllers: [ AdminController ],
    providers: [ AdminService ],
})
export class AdminModule {

}
