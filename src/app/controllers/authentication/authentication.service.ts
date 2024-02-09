import { AccountEntity } from '@app/database';
import { AuthResponse } from '@app/interfaces';
import { assert } from '@app/utilities';
import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import ms from 'ms';
import { Repository } from 'typeorm';

import { SignInDTO, SignUpDTO } from './dto';

@Injectable()
export class AuthenticationService {
    constructor(
        @InjectRepository(AccountEntity)
        private readonly accountRepository: Repository<AccountEntity>,
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService,
    ) {
    }

    async signUp(payload: SignUpDTO): Promise<AuthResponse> {
        const accountExists = await this.accountRepository.existsBy({ email: payload.email });
        assert(!accountExists, () => new ConflictException('Account exists'));

        const password = await bcrypt.hash(payload.password, 10);

        const account = new AccountEntity();
        account.name = payload.name;
        account.email = payload.email;
        account.password = password;
        await this.accountRepository.save(account);

        return this.signTokensAndUpdateUser(account);
    }

    async signIn({ email, password }: SignInDTO): Promise<AuthResponse> {
        const account = await this.accountRepository.findOneBy({ email });
        assert(!!account, () => new NotFoundException('Account not found'));

        const passwordMatched = await bcrypt.compare(password, account.password);
        assert(passwordMatched, () => new BadRequestException('Wrong password'));

        return this.signTokensAndUpdateUser(account);
    }

    async refresh({ id, refreshToken }: Express.User): Promise<AuthResponse> {
        const account = await this.accountRepository.findOneBy({ id });
        assert(!!account, () => new NotFoundException('Account not found'));

        const tokenMatched = await bcrypt.compare(refreshToken, account.refreshToken);
        assert(tokenMatched, () => new BadRequestException('Invalid refresh token'));

        return this.signTokensAndUpdateUser(account);
    }

    async signOut({ id }: Express.User): Promise<void> {
        const account = await this.accountRepository.findOneBy({ id });
        assert(!!account, () => new NotFoundException('Account not found'));

        await this.accountRepository.save({ ...account, refreshToken: null });
        return Promise.resolve();
    }

    private getPayload({ id, role }: AccountEntity): Express.User {
        return { id, role };
    }

    private async signTokensAndUpdateUser(account: AccountEntity): Promise<AuthResponse> {
        const { access, refresh } = await this.signTokens(this.getPayload(account));
        account.refreshToken = await bcrypt.hash(refresh.token, 10);
        await this.accountRepository.save(account);
        return { access, refresh };
    }

    private async signTokens(user: Express.User): Promise<AuthResponse> {
        const access = await this.signAccessToken(user);
        const refresh = await this.signRefreshToken(user);
        return { access, refresh };
    }

    private async signAccessToken(user: Express.User): Promise<AuthResponse['access']> {
        const secret = this.configService.get('JWT_ACCESS_SECRET');
        const expiresIn = this.configService.get('JWT_ACCESS_EXPIRE');

        const token = await this.jwtService.signAsync(user, { secret, expiresIn });
        const expiresAt = Date.now() + Number(ms(expiresIn));

        return { token, expiresAt };
    }

    private async signRefreshToken(user: Express.User): Promise<AuthResponse['refresh']> {
        const secret = this.configService.get('JWT_REFRESH_SECRET');
        const expiresIn = this.configService.get('JWT_REFRESH_EXPIRE');

        const token = await this.jwtService.signAsync(user, { secret, expiresIn });
        const expiresAt = Date.now() + Number(ms(expiresIn));

        return { token, expiresAt };
    }
}
