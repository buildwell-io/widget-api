import { AccountEntity } from '@core/database';
import { Account } from '@core/interfaces';
import { Controller, Get, Req, Version } from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiHeader,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
    ApiTooManyRequestsResponse,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { AccountService } from './account.service';

@ApiTags('account')
@Controller('account')
@ApiHeader({ name: 'Authorization', required: true, description: 'Bearer <access_token>' })
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'The account was not signed in' })
@ApiTooManyRequestsResponse({ description: 'Too many requests (16/sec)' })
export class AccountController {
    constructor(private readonly accountService: AccountService) {
    }

    @Get('me')
    @Version('1')
    @ApiOperation({ summary: 'Get information about an account logged in' })
    @ApiOkResponse({ description: 'The information will be returned', type: AccountEntity })
    async me(@Req() { user }: Express.Request): Promise<Account> {
        return this.accountService.accountMe(user);
    }
}
