import { Body, Controller, HttpCode, HttpStatus, Post, Req, Version } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiConflictResponse,
    ApiCreatedResponse,
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
import { SignUpDTO } from './dto/sign-up.dto';
import { SignInDTO } from './dto/sign-in.dto';
import { RefreshDTO } from './dto/refresh.dto';
import { PublicApi } from './decorators/public-api.decorator';
import { AuthResponseSwagger } from '@modules/authentication/interfaces/auth-response.interface';

@ApiTags('authentication')
@Controller('authentication')
@ApiTooManyRequestsResponse({ description: 'Too many requests. (The maximum is 16/sec)' })
export class AuthenticationController {
    constructor(private readonly authenticationService: AuthenticationService) {
    }

    @Post('sign-up')
    @Version('1')
    @PublicApi()
    @Throttle({ default: { limit: 3, ttl: 60_000 } })
    @ApiOperation({ summary: 'Create an account' })
    @ApiCreatedResponse({ description: 'Account created', type: AuthResponseSwagger })
    @ApiBadRequestResponse({ description: 'Wrong data passed' })
    @ApiConflictResponse({ description: 'Account already exists' })
    @ApiTooManyRequestsResponse({ description: 'Too many requests. (The maximum is 3/sec)' })
    signUp(@Body() payload: SignUpDTO) {
        return this.authenticationService.signUp(payload);
    }

    @Post('sign-in')
    @Version('1')
    @PublicApi()
    @Throttle({ default: { limit: 3, ttl: 60_000 } })
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Sign in exists account' })
    @ApiOkResponse({ description: 'Signed in', type: AuthResponseSwagger })
    @ApiBadRequestResponse({ description: 'Wrong password' })
    @ApiNotFoundResponse({ description: 'Account does not exist' })
    @ApiTooManyRequestsResponse({ description: 'Too many requests. (The maximum is 3/sec)' })
    signIn(@Body() payload: SignInDTO) {
        return this.authenticationService.signIn(payload);
    }

    @Post('sign-out')
    @Version('1')
    @Throttle({ default: { limit: 3, ttl: 60_000 } })
    @HttpCode(HttpStatus.OK)
    @ApiHeader({ name: 'Authorization', required: true, description: 'Bearer eyJhbGciOi...' })
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Sign out an account' })
    @ApiOkResponse({ description: 'Signed out' })
    @ApiUnauthorizedResponse({ description: 'The account was not signed in' })
    @ApiTooManyRequestsResponse({ description: 'Too many requests. (The maximum is 3/sec)' })
    signOut(@Req() { user }: Express.Request): Promise<unknown> {
        return this.authenticationService.signOut(user);
    }

    @Post('refresh')
    @Version('1')
    @Throttle({ default: { limit: 3, ttl: 60_000 } })
    @HttpCode(HttpStatus.OK)
    @ApiHeader({ name: 'Authorization', required: true, description: 'Bearer eyJhbGciOi...' })
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Refresh tokens' })
    @ApiOkResponse({ description: 'Tokens refreshed', type: AuthResponseSwagger })
    @ApiUnauthorizedResponse({ description: 'The account was not signed in' })
    @ApiForbiddenResponse({ description: 'Refresh token does not exist or is invalid' })
    @ApiNotFoundResponse({ description: 'Not found an account request made with' })
    @ApiTooManyRequestsResponse({ description: 'Too many requests. (The maximum is 3/sec)' })
    refresh(@Body() payload: RefreshDTO, @Req() { user }: Express.Request) {
        return this.authenticationService.refresh(payload, user);
    }
}
