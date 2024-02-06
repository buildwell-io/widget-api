import { AccountEntity } from '@core/database';
import { Account } from '@core/interfaces';
import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Version } from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiForbiddenResponse,
    ApiHeader,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
    ApiTooManyRequestsResponse,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';

import { AccountService } from './account.service';
import { EmailVerificationVerifyDTO } from './dto';

@ApiTags('account')
@Controller('account')
@ApiHeader({ name: 'Authorization', required: true, description: 'Bearer <access_token>' })
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@ApiTooManyRequestsResponse({ description: 'Too many requests (16/min)' })
export class AccountController {
    constructor(private readonly accountService: AccountService) {}

    @Get('me')
    @Version('1')
    @ApiOperation({ summary: 'Get information about an account logged in' })
    @ApiOkResponse({ description: 'The information will be returned', type: AccountEntity })
    async me(@Req() { user }: Express.Request): Promise<Account> {
        return this.accountService.accountMe(user);
    }

    @Post('email-verification/send')
    @Version('1')
    @HttpCode(HttpStatus.OK)
    @Throttle({ default: { limit: 3, ttl: 60_000 } })
    @ApiOperation({ summary: 'Generate and send TOTP on email' })
    @ApiOkResponse({ description: 'Success' })
    @ApiForbiddenResponse({ description: 'Email already verified' })
    @ApiNotFoundResponse({ description: 'Account does not exist' })
    @ApiTooManyRequestsResponse({ description: 'Too many requests (3/min)' })
    async emailVerificationSend(@Req() { user }: Express.Request): Promise<void> {
        return this.accountService.accountEmailVerificationSend(user);
    }

    @Post('email-verification/verify')
    @Version('1')
    @HttpCode(HttpStatus.OK)
    @Throttle({ default: { limit: 3, ttl: 60_000 } })
    @ApiOperation({ summary: 'Verify TOTP' })
    @ApiOkResponse({ description: 'Success' })
    @ApiBadRequestResponse({ description: 'Invalid TOTP' })
    @ApiForbiddenResponse({ description: 'Email already verified or there is no TOTP generated' })
    @ApiNotFoundResponse({ description: 'Account does not exist' })
    @ApiTooManyRequestsResponse({ description: 'Too many requests (3/min)' })
    async emailVerificationVerify(@Body() payload: EmailVerificationVerifyDTO, @Req() { user }: Express.Request): Promise<void> {
        return this.accountService.accountEmailVerificationVerify(payload, user);
    }
}
