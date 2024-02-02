import { Controller, Get, Version } from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiHeader,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
    ApiTooManyRequestsResponse,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Account } from '@interfaces/account.interface';
import { ExtractJWTPayload } from '@modules/authentication/decorators/jwt-payload.decorator';
import { JWTPayload } from '@modules/authentication/interfaces/jwt-payload.interface';
import { AccountEntity } from '@core/database/entities/account.entity';
import { AccountService } from './account.service';

@ApiTags('account')
@Controller('account')
@ApiHeader({ name: 'Authorization', required: true, description: 'Bearer eyJhbGciOi...' })
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'The account was not signed in' })
@ApiTooManyRequestsResponse({ description: 'Too many requests. (The maximum is 16/sec)' })
export class AccountController {
    constructor(private readonly accountService: AccountService) {
    }

    @Get('me')
    @Version('1')
    @ApiOperation({ summary: 'Get information about an account logged in' })
    @ApiOkResponse({ description: 'The information will be returned', type: AccountEntity })
    async me(@ExtractJWTPayload() jwtPayload: JWTPayload): Promise<Account> {
        return this.accountService.accountMe(jwtPayload);
    }
}
