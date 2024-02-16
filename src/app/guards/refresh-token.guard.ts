import { REFRESH_TOKEN_STRATEGY_NAME } from '@app/strategies';
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class RefreshTokenGuard extends AuthGuard(REFRESH_TOKEN_STRATEGY_NAME) {}
