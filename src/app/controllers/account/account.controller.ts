import { AccountEntity } from '@app/database';
import { Body, Controller, Get, HttpStatus, Patch, Req, Version } from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AccountService } from './account.service';
import { ChangePasswordDTO, UpdateDTO } from './dto';

@ApiTags('account')
@Controller('account')
@ApiBearerAuth()
@ApiHeader({ name: 'Authorization', required: true, description: 'Bearer <access_token>' })
@ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
@ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Account not found' })
export class AccountController {
    constructor(private readonly accountService: AccountService) {}

    @Get()
    @Version('1')
    @ApiOperation({ summary: 'Get logged in account information' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: AccountEntity })
    async me(@Req() { user }: Express.Request): Promise<AccountEntity> {
        return this.accountService.me(user);
    }

    @Patch()
    @Version('1')
    @ApiOperation({ summary: 'Update logged in account information' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: AccountEntity })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid payload' })
    async update(@Body() payload: UpdateDTO, @Req() { user }: Express.Request): Promise<AccountEntity> {
        return this.accountService.update(payload, user);
    }

    @Patch('password')
    @Version('1')
    @ApiOperation({ summary: 'Change logged in account password' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
    async changePassword(@Body() payload: ChangePasswordDTO, @Req() { user }: Express.Request) {
        return this.accountService.changePassword(payload, user);
    }
}
