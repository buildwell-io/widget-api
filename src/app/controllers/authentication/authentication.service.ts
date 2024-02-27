import { AccountEntity } from '@app/database';
import { DBConnectionName } from '@app/enums';
import { AuthResponse } from '@app/interfaces';
import { assert } from '@app/utilities';
import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { SignInDTO, SignUpDTO } from './dto';

@Injectable()
export class AuthenticationService {
    constructor(
        @InjectRepository(AccountEntity, DBConnectionName.PostgresSQL)
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

    private getPayload({ id, type }: AccountEntity): Express.User {
        return { id, type };
    }

    private async signTokensAndUpdateUser(account: AccountEntity): Promise<AuthResponse> {
        const { accessToken, refreshToken } = await this.signTokens(this.getPayload(account));
        account.refreshToken = await bcrypt.hash(refreshToken, 10);
        await this.accountRepository.save(account);
        return { accessToken, refreshToken };
    }

    private async signTokens(user: Express.User): Promise<AuthResponse> {
        const accessToken = await this.signAccessToken(user);
        const refreshToken = await this.signRefreshToken(user);
        return { accessToken, refreshToken };
    }

    private async signAccessToken(user: Express.User): Promise<string> {
        const secret = this.configService.get('JWT_ACCESS_SECRET');
        const expiresIn = this.configService.get('JWT_ACCESS_EXPIRE');
        return this.jwtService.signAsync(user, { secret, expiresIn });
    }

    private async signRefreshToken(user: Express.User): Promise<string> {
        const secret = this.configService.get('JWT_REFRESH_SECRET');
        const expiresIn = this.configService.get('JWT_REFRESH_EXPIRE');
        return this.jwtService.signAsync(user, { secret, expiresIn });
    }
}
