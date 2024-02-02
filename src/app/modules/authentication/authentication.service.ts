import {
    BadRequestException,
    ConflictException,
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { SignUpDTO } from './dto/sign-up.dto';
import { SignInDTO } from './dto/sign-in.dto';
import { RefreshDTO } from './dto/refresh.dto';
import { AccountService } from '@modules/account/account.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import ms from 'ms';
import { JWTPayload } from './interfaces/jwt-payload.interface';
import { AuthResponse } from '@modules/authentication/interfaces/auth-response.interface';
import { Account } from '@interfaces/account.interface';

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

    async signOut(jwtPayload: JWTPayload) {
        if (!await this.accountService.exists(jwtPayload.userId)) {
            throw new NotFoundException();
        }

        await this.accountService.update(jwtPayload.userId, { refreshToken: null });
    }

    async refresh(payload: RefreshDTO, jwtPayload: JWTPayload): Promise<AuthResponse> {
        if (!await this.accountService.exists(jwtPayload.userId)) {
            throw new NotFoundException();
        }

        const account = await this.accountService.get(jwtPayload.userId);
        if (!payload.refreshToken ||
            !account.refreshToken ||
            !await bcrypt.compare(payload.refreshToken, account.refreshToken)
        ) {
            throw new ForbiddenException();
        }

        return this.signTokensAndUpdateUser(account);
    }

    private getPayload(account: Account): JWTPayload {
        return {
            userId: account.id,
            role: account.role,
        };
    }

    private async signTokensAndUpdateUser(account: Account): Promise<AuthResponse> {
        const { access, refresh } = await this.signTokens(this.getPayload(account));
        account.refreshToken = await bcrypt.hash(refresh.token, 10);
        await this.accountService.save(account);
        return { access, refresh };
    }

    private async signTokens(payload: JWTPayload): Promise<AuthResponse> {
        const access = await this.signAccessToken(payload);
        const refresh = await this.signRefreshToken(payload);
        return { access, refresh };
    }

    private async signAccessToken(payload: JWTPayload): Promise<AuthResponse['access']> {
        const secret = this.configService.get('JWT_ACCESS_SECRET');
        const expiresIn = this.configService.get('JWT_ACCESS_EXPIRE');

        const token = await this.jwtService.signAsync(payload, { secret, expiresIn });
        const expiresAt = Date.now() + Number(ms(expiresIn));

        return { token, expiresAt };
    }

    private async signRefreshToken(payload: JWTPayload): Promise<AuthResponse['refresh']> {
        const secret = this.configService.get('JWT_REFRESH_SECRET');
        const expiresIn = this.configService.get('JWT_REFRESH_EXPIRE');

        const token = await this.jwtService.signAsync(payload, { secret, expiresIn });
        const expiresAt = Date.now() + Number(ms(expiresIn));

        return { token, expiresAt };
    }
}
