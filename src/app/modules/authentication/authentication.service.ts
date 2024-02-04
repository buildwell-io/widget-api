import { Account } from '@core/interfaces';
import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import ms from 'ms';

import { AccountService } from '../account';
import { SignInDTO, SignUpDTO } from './dto';
import { AuthResponse } from './interfaces';

@Injectable()
export class AuthenticationService {
    constructor(
        private readonly accountService: AccountService,
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService,
    ) {
    }

    async signUp(payload: SignUpDTO): Promise<AuthResponse> {
        if (await this.accountService.exists(payload.email)) {
            throw new ConflictException();
        }

        const password = await bcrypt.hash(payload.password, 10);
        const account = await this.accountService.create({ ...payload, password });
        return this.signTokensAndUpdateUser(account);
    }

    async signIn(payload: SignInDTO): Promise<AuthResponse> {
        if (!await this.accountService.exists(payload.email)) {
            throw new NotFoundException();
        }

        const account = await this.accountService.get(payload.email);
        if (!await bcrypt.compare(payload.password, account.password)) {
            throw new BadRequestException();
        }

        return this.signTokensAndUpdateUser(account);
    }

    async signOut(user: Express.User): Promise<unknown> {
        if (!await this.accountService.exists(user.id)) {
            throw new NotFoundException();
        }

        await this.accountService.update(user.id, { refreshToken: null });

        return Promise.resolve();
    }

    async refresh(user: Express.User): Promise<AuthResponse> {
        if (!await this.accountService.exists(user.id)) {
            throw new NotFoundException();
        }

        const account = await this.accountService.get(user.id);
        if (!await bcrypt.compare(user.refreshToken, account.refreshToken)) {
            throw new BadRequestException();
        }

        return this.signTokensAndUpdateUser(user);
    }

    private getPayload({ id, role }: Account | Express.User): Express.User {
        return { id, role };
    }

    private async signTokensAndUpdateUser(account: Account | Express.User): Promise<AuthResponse> {
        const { access, refresh } = await this.signTokens(this.getPayload(account));
        account.refreshToken = await bcrypt.hash(refresh.token, 10);
        await this.accountService.save(account);
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
