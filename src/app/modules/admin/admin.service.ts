import { Injectable } from '@nestjs/common';
import { AccountEntity } from '@core/database/entities/account.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from '@interfaces/account.interface';

@Injectable()
export class AdminService {
    constructor(@InjectRepository(AccountEntity) private accountRepository: Repository<Account>) {
    }
}
