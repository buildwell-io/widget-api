import { AccountEntity } from '@app/database';
import { assert } from '@app/utilities';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { instanceToPlain } from 'class-transformer';
import { Repository } from 'typeorm';

import { ChangePasswordDTO, UpdateDTO } from './dto';

@Injectable()
export class AccountService {
    constructor(
        @InjectRepository(AccountEntity)
        private readonly accountRepository: Repository<AccountEntity>,
    ) {}

    async me(user: Express.User): Promise<AccountEntity> {
        const account = await this.accountRepository.findOneBy({ id: user.id });
        assert(!!account, () => new NotFoundException('Account not found'));
        return account;
    }

    async update(payload: UpdateDTO, user: Express.User): Promise<AccountEntity> {
        const account = await this.accountRepository.findOneBy({ id: user.id });
        assert(!!account, () => new NotFoundException('Account not found'));
        return this.accountRepository.save({ ...instanceToPlain(account), ...payload });
    }

    async changePassword(payload: ChangePasswordDTO, user: Express.User) {
        const account = await this.accountRepository.findOneBy({ id: user.id });
        assert(!!account, () => new NotFoundException('Account not found'));
        // TODO: Complete
    }
}
