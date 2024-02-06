import { AccountEntity } from '@core/database';
import { Account } from '@core/interfaces';
import { MailService } from '@core/mail';
import { assert } from '@core/utils';
import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as speakeasy from 'speakeasy';
import { DeepPartial, Repository, UpdateResult } from 'typeorm';

import { EmailVerificationVerifyDTO } from './dto';

@Injectable()
export class AccountService {
    constructor(
        @InjectRepository(AccountEntity) private readonly accountRepository: Repository<Account>,
        private readonly mailService: MailService,
    ) {}

    async accountMe(user: Express.User): Promise<Account> {
        return this.get(user.id);
    }

    async accountEmailVerificationSend(user: Express.User): Promise<void> {
        assert(await this.exists(user.id), () => new NotFoundException('Account does not exist'));
        assert(!await this.isEmailVerified(user.id), () => new ForbiddenException('Email already verified'));
        return this.TOTPSend(user);
    }

    async accountEmailVerificationVerify(payload: EmailVerificationVerifyDTO, user: Express.User): Promise<void> {
        assert(await this.exists(user.id), () => new NotFoundException('Account does not exist'));
        assert(!await this.isEmailVerified(user.id), () => new ForbiddenException('Email already verified'));
        await this.TOTPVerify(user, payload.totp);
        await this.update(user.id, { isEmailVerified: true });
        return Promise.resolve();
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

    async isEmailVerified(idOrEmail: number | string): Promise<boolean> {
        const who = typeof idOrEmail === 'number'
            ? { id: idOrEmail }
            : { email: idOrEmail };

        return this.accountRepository.existsBy({
            ...who,
            isEmailVerified: true,
        });
    }

    async TOTPSend(user: Express.User): Promise<void> {
        const totpCreatedAt = Math.floor(Date.now() / 1000);

        const totpSecret = speakeasy.generateSecret({ length: 16 }).base32;
        const totp = speakeasy.totp({
            secret: totpSecret,
            encoding: 'base32',
            step: 300, // sec
        });

        await this.update(user.id, { totpSecret, totpCreatedAt });

        const { email: accountEmail } = await this.get(user.id);
        await this.mailService.send({
            from: 'no-reply@buildwell.io',
            to: accountEmail,
            templateId: 'd-6d707a5bf0dd4669a5f77f7e7bf4da7a',
            dynamicTemplateData: { TOTP: totp },
        });

        return Promise.resolve();
    }

    async TOTPVerify(user: Express.User, token: string): Promise<void> {
        const { totpSecret, totpCreatedAt } = await this.get(user.id);
        assert(!!(totpSecret && totpCreatedAt), () => new ForbiddenException('TOTP was not sent'));

        const totpLifetime = 600; // sec
        const currentTime = Math.floor(Date.now() / 1000);
        const totpAge = currentTime - totpCreatedAt;
        assert(totpAge <= totpLifetime, () => new BadRequestException('TOTP expired'));

        const verified = speakeasy.totp.verify({
            secret: totpSecret,
            encoding: 'base32',
            token,
            window: 1,
            step: 300, // sec,
        });
        assert(verified, () => new BadRequestException('invalid TOTP'));

        await this.update(user.id, { totpSecret: null, totpCreatedAt: null });
        return Promise.resolve();
    }
}
