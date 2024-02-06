import { AuthResponseSwagger, HttpExceptionEntity } from '@core/swagger';
import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards, Version } from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiConflictResponse,
    ApiCreatedResponse,
    ApiHeader,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
    ApiTooManyRequestsResponse,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';

import { AuthenticationService } from './authentication.service';
import { PublicApi } from './decorators';
import { SignInDTO, SignUpDTO } from './dto';
import { RefreshTokenGuard } from './guards';

@ApiTags('authentication')
@Controller('authentication')
@Throttle({ default: { limit: 3, ttl: 60_000 } })
@ApiTooManyRequestsResponse({ description: 'Too many requests (3/min)' })
export class AuthenticationController {
    constructor(private readonly authenticationService: AuthenticationService) {}

    // region sign-up
    @Post('sign-up')
    @Version('1')
    @PublicApi()
    @ApiOperation({ summary: 'Create an account' })
    @ApiCreatedResponse({ description: 'Account created', type: AuthResponseSwagger })
    @ApiBadRequestResponse({ description: 'Invalid payload' })
    @ApiConflictResponse({ description: 'Account already exists' })
    signUp(@Body() payload: SignUpDTO) {
        return this.authenticationService.signUp(payload);
    }

    // endregion

    // region sign-in
    @Post('sign-in')
    @Version('1')
    @PublicApi()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Sign in exists account' })
    @ApiOkResponse({ description: 'Signed in', type: AuthResponseSwagger })
    @ApiBadRequestResponse({ description: 'Wrong data passed', type: HttpExceptionEntity })
    @ApiNotFoundResponse({ description: 'Account does not exist', type: HttpExceptionEntity })
    signIn(@Body() payload: SignInDTO) {
        return this.authenticationService.signIn(payload);
    }

    // endregion

    // region sign-out
    @Post('sign-out')
    @Version('1')
    @HttpCode(HttpStatus.OK)
    @ApiHeader({ name: 'Authorization', required: true, description: 'Bearer <access_token>' })
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Sign out an account' })
    @ApiOkResponse({ description: 'Signed out' })
    @ApiUnauthorizedResponse({ description: 'The account was not signed in', type: HttpExceptionEntity })
    @ApiNotFoundResponse({ description: 'Account does not exist', type: HttpExceptionEntity })
    signOut(@Req() { user }: Express.Request): Promise<unknown> {
        return this.authenticationService.signOut(user);
    }

    // endregion

    // region refresh
    @Post('refresh')
    @Version('1')
    @PublicApi()
    @UseGuards(RefreshTokenGuard)
    @HttpCode(HttpStatus.OK)
    @ApiHeader({ name: 'Authorization', required: true, description: 'Bearer <refresh_token>' })
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Refresh tokens' })
    @ApiOkResponse({ description: 'Tokens refreshed', type: AuthResponseSwagger })
    @ApiBadRequestResponse({ description: 'Invalid refresh token', type: HttpExceptionEntity })
    @ApiNotFoundResponse({ description: 'Account does not exist', type: HttpExceptionEntity })
    refresh(@Req() { user }: Express.Request) {
        return this.authenticationService.refresh(user);
    }

    // endregion
}
