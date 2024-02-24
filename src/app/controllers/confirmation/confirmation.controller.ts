import { ConfirmationEntity } from '@app/database';
import { ConfirmationAction } from '@app/enums';
import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    ParseEnumPipe,
    ParseUUIDPipe,
    Post,
    Query,
    Req,
    Version,
} from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ConfirmationService } from './confirmation.service';
import { SendDTO } from './dto';

@ApiTags('confirmation')
@Controller('confirmation')
@ApiBearerAuth()
@ApiHeader({ name: 'Authorization', required: true, description: 'Bearer <access_token>' })
@ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
export class ConfirmationController {
    constructor(private readonly confirmationService: ConfirmationService) {}

    @Post()
    @Version('1')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Send a confirmation token through account-preferred method' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: ConfirmationEntity })
    send(@Body() payload: SendDTO, @Req() { user }: Express.Request) {
        return this.confirmationService.send(payload, user);
    }

    @Get()
    @Version('1')
    @HttpCode(HttpStatus.OK)
    @ApiQuery({ name: 'action', type: String, example: ConfirmationAction.EmailConfirm })
    @ApiQuery({ name: 'token', type: String, example: '66aec774-2778-4363-ada3-628df95304d8' })
    @ApiOperation({ summary: 'Confirm a token' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Action already confirmed' })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid/Expired/Confirmed token' })
    confirm(
        @Query('action', new ParseEnumPipe(ConfirmationAction)) action: ConfirmationAction,
        @Query('token', new ParseUUIDPipe({ version: '4' })) token: string,
        @Req() { user }: Express.Request,
    ) {
        return this.confirmationService.confirm(action, token, user);
    }
}
