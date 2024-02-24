import { Public } from '@app/decorators';
import { RefreshTokenGuard } from '@app/guards';
import { AuthResponseSwagger } from '@app/swagger';
import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards, Version } from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiHeader,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';

import { AuthenticationService } from './authentication.service';
import { SignInDTO, SignUpDTO } from './dto';

@ApiTags('authentication')
@Controller('authentication')
export class AuthenticationController {
    constructor(private readonly authenticationService: AuthenticationService) {}

    @Post('sign-up')
    @Version('1')
    @Public()
    @ApiOperation({ summary: 'Create an account' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'Success', type: AuthResponseSwagger })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid payload' })
    @ApiResponse({ status: HttpStatus.CONFLICT, description: 'Account already exists' })
    signUp(@Body() payload: SignUpDTO) {
        return this.authenticationService.signUp(payload);
    }

    @Post('sign-in')
    @Version('1')
    @Public()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Sign in exists account' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: AuthResponseSwagger })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid payload' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Account does not exist' })
    signIn(@Body() payload: SignInDTO) {
        return this.authenticationService.signIn(payload);
    }

    @Post('sign-out')
    @Version('1')
    @HttpCode(HttpStatus.OK)
    @ApiHeader({ name: 'Authorization', required: true, description: 'Bearer <access_token>' })
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Sign out an account' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Account does not exist' })
    signOut(@Req() { user }: Express.Request): Promise<unknown> {
        return this.authenticationService.signOut(user);
    }

    @Post('refresh')
    @Version('1')
    @Public()
    @UseGuards(RefreshTokenGuard)
    @HttpCode(HttpStatus.OK)
    @ApiHeader({ name: 'Authorization', required: true, description: 'Bearer <refresh_token>' })
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Refresh tokens' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: AuthResponseSwagger })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid payload' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Account does not exist' })
    refresh(@Req() { user }: Express.Request) {
        return this.authenticationService.refresh(user);
    }
}
