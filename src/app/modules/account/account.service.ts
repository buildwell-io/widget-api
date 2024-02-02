import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity } from '@core/database/entities/account.entity';
import { DeepPartial, Repository, UpdateResult } from 'typeorm';
import { Account } from '@interfaces/account.interface';

@Injectable()
export class AccountService {
    constructor(@InjectRepository(AccountEntity) private readonly accountRepository: Repository<Account>) {
    }

    async create(payload: DeepPartial<Account>): Promise<Account> {
        const account = this.accountRepository.create(payload);
        return this.accountRepository.save(account);
    }

    async get(idOrEmail: number | string): Promise<Account> {
        const where = typeof idOrEmail === 'number'
            ? { id: idOrEmail }
            : { email: idOrEmail };

        return this.accountRepository.findOneBy(where);
    }

    async save(partialEntity: DeepPartial<Account>): Promise<Account> {
        return this.accountRepository.save(partialEntity);
    }

    async update(idOrEmail: number | string, partialEntity: DeepPartial<Account>): Promise<UpdateResult> {
        const where = typeof idOrEmail === 'number'
            ? { id: idOrEmail }
            : { email: idOrEmail };

        return this.accountRepository.update(where, partialEntity);
    }

    async exists(idOrEmail: number | string): Promise<boolean> {
        const where = typeof idOrEmail === 'number'
            ? { id: idOrEmail }
            : { email: idOrEmail };

        return this.accountRepository.existsBy(where);
    }
}
