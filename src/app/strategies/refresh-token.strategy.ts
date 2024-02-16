import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

export const REFRESH_TOKEN_STRATEGY_NAME = 'jwt-refresh';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, REFRESH_TOKEN_STRATEGY_NAME) {
    constructor(configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get('JWT_REFRESH_SECRET'),
            ignoreExpiration: false,
            passReqToCallback: true,
        });
    }

    validate(req: Request, payload: Express.User) {
        const [ , refreshToken ] = req.headers.authorization.split(' ');
        return { ...payload, refreshToken };
    }
}
