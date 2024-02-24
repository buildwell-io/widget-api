import { WidgetEntity } from '@app/database';
import { ApiPaginatedResponse, Pagination } from '@app/decorators';
import { Paginated, PaginationRequest } from '@app/interfaces';
import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Req,
    Version,
} from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateWidgetDTO, UpdateWidgetDTO } from './dto';
import { WidgetService } from './widget.service';

@ApiTags('widget')
@Controller('widget')
@ApiBearerAuth()
@ApiHeader({ name: 'Authorization', required: true, description: 'Bearer <access_token>' })
@ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
export class WidgetController {
    constructor(private readonly widgetService: WidgetService) {}

    @Post()
    @Version('1')
    @ApiOperation({ summary: 'Create a widget' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'Success', type: WidgetEntity })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid payload' })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Email is not confirmed' })
    create(@Body() payload: CreateWidgetDTO, @Req() { user }: Express.Request): Promise<WidgetEntity> {
        return this.widgetService.create(payload, user);
    }

    @Get('list')
    @Version('1')
    @ApiQuery({ name: 'pageIndex', required: true })
    @ApiQuery({ name: 'perPage', required: true })
    @ApiOperation({ summary: 'Get a paginated list of widgets' })
    @ApiPaginatedResponse(WidgetEntity, { description: 'Paginated widgets' })
    getList(@Pagination() pagination: PaginationRequest, @Req() { user }: Express.Request): Promise<Paginated<WidgetEntity>> {
        return this.widgetService.getList(pagination, user);
    }

    @Get(':widgetId')
    @Version('1')
    @ApiOperation({ summary: 'Get a single widget' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: WidgetEntity })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid payload' })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Authorized account is not an owner of the widget' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Widget not found' })
    get(@Param('widgetId', new ParseIntPipe()) widgetId: number, @Req() { user }: Express.Request): Promise<WidgetEntity> {
        return this.widgetService.getSingle(widgetId, user);
    }

    @Patch(':widgetId')
    @Version('1')
    @ApiOperation({ summary: 'Update a widget' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: WidgetEntity })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid payload' })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Authorized account is not an owner of the widget' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Widget not found' })
    update(
        @Param('widgetId') widgetId: number,
        @Body() payload: UpdateWidgetDTO,
        @Req() { user }: Express.Request,
    ): Promise<WidgetEntity> {
        return this.widgetService.update(widgetId, payload, user);
    }

    @Delete(':widgetId')
    @Version('1')
    @ApiOperation({ summary: 'Delete a widget' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid payload' })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Authorized account is not an owner of the widget' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Widget not found' })
    delete(@Param('widgetId', new ParseIntPipe()) widgetId: number, @Req() { user }: Express.Request): Promise<void> {
        return this.widgetService.delete(widgetId, user);
    }
}
