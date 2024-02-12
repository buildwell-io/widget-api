import { AccountEntity } from '@app/database';
import { ConfirmationAction } from '@app/enums';
import { AppConfirmationService } from '@app/services';
import { assert } from '@app/utilities';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { instanceToPlain } from 'class-transformer';
import { Repository } from 'typeorm';

import { ChangePasswordDTO, UpdateDTO } from './dto';

@Injectable()
export class AccountService {
    constructor(
        @InjectRepository(AccountEntity)
        private readonly accountRepository: Repository<AccountEntity>,
        private readonly appConfirmationService: AppConfirmationService,
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

        const passwordMatched = await bcrypt.compare(payload.oldPassword, account.password);
        assert(passwordMatched, () => new BadRequestException('Wrong password'));

        await this.appConfirmationService.confirm({
            accountId: user.id,
            action: ConfirmationAction.PasswordChange,
            token: payload.token,
        });

        account.password = await bcrypt.hash(payload.newPassword, 10);
        await this.accountRepository.save(account);
    }
}
