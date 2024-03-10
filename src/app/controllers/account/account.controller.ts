import { AccountEntity } from '@app/database';
import { IUploadedFile } from '@app/interfaces';
import {
    Body,
    Controller,
    Get,
    HttpStatus,
    ParseFilePipeBuilder,
    Patch,
    Put,
    Req,
    UploadedFile,
    UseInterceptors,
    Version,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AccountService } from './account.service';
import { ChangePasswordDTO, UpdateDTO } from './dto';
import { JPEGFileTypeValidator } from './validators/jpeg.validator';

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
    me(@Req() { user }: Express.Request): Promise<AccountEntity> {
        return this.accountService.me(user);
    }

    @Patch()
    @Version('1')
    @ApiOperation({ summary: 'Update logged in account information' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: AccountEntity })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid payload' })
    update(@Body() payload: UpdateDTO, @Req() { user }: Express.Request): Promise<AccountEntity> {
        return this.accountService.update(payload, user);
    }

    @Put('password')
    @Version('1')
    @ApiOperation({ summary: 'Change logged in account password' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
    changePassword(@Body() payload: ChangePasswordDTO, @Req() { user }: Express.Request) {
        return this.accountService.changePassword(payload, user);
    }

    @Put('profile-photo')
    @Version('1')
    @UseInterceptors(FileInterceptor('file'))
    @ApiOperation({ summary: 'Change logged in account profiles photo' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
    changeProfilePhoto(@UploadedFile(
        new ParseFilePipeBuilder()
            .addFileTypeValidator({ fileType: 'image/jpeg' })
            .addMaxSizeValidator({ maxSize: 2 * 1024 * 1024 }) // 2mb
            .addValidator(new JPEGFileTypeValidator({}))
            .build(),
    ) file: IUploadedFile, @Req() { user }: Express.Request) {
        return this.accountService.changeProfilePhoto(file, user);
    }
}
