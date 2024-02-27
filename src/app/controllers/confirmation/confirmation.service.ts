import { AccountEntity, ConfirmationEntity } from '@app/database';
import { ConfirmationAction, DBConnectionName } from '@app/enums';
import { AppConfirmationService, AppMailService } from '@app/services';
import { assert } from '@app/utilities';
import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SendDTO } from './dto';

@Injectable()
export class ConfirmationService {
    private readonly logger = new Logger('ConfirmationService');

    constructor(
        @InjectRepository(ConfirmationEntity, DBConnectionName.PostgresSQL)
        private readonly confirmationRepository: Repository<ConfirmationEntity>,
        @InjectRepository(AccountEntity, DBConnectionName.PostgresSQL)
        private readonly accountRepository: Repository<AccountEntity>,
        private readonly appConfirmationService: AppConfirmationService,
        private readonly appMailService: AppMailService,
    ) {}

    async send({ action }: SendDTO, user: Express.User) {
        const confirmation = await this.appConfirmationService.create({
            action,
            accountId: user.id,
            tokenLifetime: 300e3,
        });
        const account = await this.accountRepository.findOneBy({ id: user.id });

        // TODO: Add link to email confirmation
        await this.appMailService.send({
            from: 'no-reply@buildwell.io',
            to: account.email,
            templateId: 'd-6d707a5bf0dd4669a5f77f7e7bf4da7a',
            dynamicTemplateData: { TOTP: '' },
        });

        return confirmation;
    }

    async confirm(action: ConfirmationAction, token: string, user: Express.User) {
        const confirmation = await this.appConfirmationService.confirm({ action, token, accountId: user.id });

        switch (confirmation.action) {
            case ConfirmationAction.EmailConfirm: {
                const account = await this.accountRepository.findOneBy({ id: user.id });
                assert(!account.hasConfirmedEmail, () => new ForbiddenException('Email already confirmed'));
                await this.accountRepository.save({ ...account, hasConfirmedEmail: true });
            }
        }
    }

    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
    private async cleanRedundantTokensTask(): Promise<void> {
        const result = await this.confirmationRepository
            .createQueryBuilder('confirmation')
            .delete()
            .from(ConfirmationEntity)
            .where('confirmation.confirmedAt IS NOT NULL')
            .orWhere('confirmation.expiresAt < NOW()')
            .execute();

        this.logger.log(`(cleanRedundantTokensTask): affected ${result.affected} rows`);
    }
}
