import { AccountEntity, ConfirmationEntity } from '@app/database';
import { assert } from '@app/utilities';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, MoreThanOrEqual, Repository } from 'typeorm';

import { ConfirmOptions, SendOptions } from './types';

@Injectable()
export class AppConfirmationService {
    constructor(
        @InjectRepository(ConfirmationEntity)
        private readonly confirmationRepository: Repository<ConfirmationEntity>,
        @InjectRepository(AccountEntity)
        private readonly accountRepository: Repository<AccountEntity>,
    ) {}

    async create({ accountId: id, action, tokenLifetime }: SendOptions): Promise<ConfirmationEntity> {
        const account = await this.accountRepository.findOneBy({ id });

        const confirmation = new ConfirmationEntity();
        confirmation.account = account;
        confirmation.action = action;
        confirmation.expiresAt = new Date(Date.now() + tokenLifetime);
        return this.confirmationRepository.save(confirmation);
    }

    async confirm({ accountId, action, token }: ConfirmOptions): Promise<ConfirmationEntity> {
        const NOW = new Date();
        const confirmation = await this.confirmationRepository.findOneBy({
            accountId, token, action,
            confirmedAt: IsNull(), /* Not confirmed */
            expiresAt: MoreThanOrEqual(NOW), /* Not expired */
        });

        assert(!!confirmation, () => new BadRequestException('Invalid token'));

        confirmation.confirmedAt = NOW;
        return this.confirmationRepository.save(confirmation);
    }
}
