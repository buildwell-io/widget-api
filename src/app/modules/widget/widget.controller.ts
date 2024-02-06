import { WidgetEntity } from '@core/database';
import { ApiPaginationOkResponse, Pagination } from '@core/decorators';
import { Widget } from '@core/interfaces';
import { Body, Controller, Delete, Get, Param, Patch, Post, Req, Version } from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiForbiddenResponse,
    ApiHeader,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiQuery,
    ApiTags,
    ApiTooManyRequestsResponse,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';

import { CreateWidgetDTO, UpdateWidgetDTO } from './dto';
import { WidgetService } from './widget.service';

@ApiTags('widget')
@Controller('widget')
@Throttle({ default: { limit: 16, ttl: 60_000 } })
@ApiHeader({ name: 'Authorization', required: true, description: 'Bearer <access_token>' })
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@ApiTooManyRequestsResponse({ description: 'Too many requests (16/min)' })
export class WidgetController {
    constructor(private readonly widgetService: WidgetService) {}

    @Post()
    @Version('1')
    @ApiOperation({ summary: 'Create a widget' })
    @ApiCreatedResponse({ description: 'Widget created', type: WidgetEntity })
    @ApiBadRequestResponse({ description: 'Invalid payload' })
    @ApiForbiddenResponse({ description: 'Email is not verified' })
    create(@Body() payload: CreateWidgetDTO, @Req() { user }: Express.Request): Promise<Widget> {
        return this.widgetService.widgetCreate(payload, user);
    }

    @Get('list')
    @Version('1')
    @ApiQuery({ name: 'pageIndex', required: true })
    @ApiQuery({ name: 'perPage', required: true })
    @ApiOperation({ summary: 'Get a paginated list of widgets' })
    @ApiPaginationOkResponse(WidgetEntity, { description: 'Paginated widgets' })
    getList(@Pagination() pagination: PaginationRequest, @Req() { user }: Express.Request): Promise<Paginated<Widget>> {
        return this.widgetService.widgetGetList(pagination, user);
    }

    @Get(':widgetId')
    @Version('1')
    @ApiOperation({ summary: 'Get a single widget' })
    @ApiOkResponse({ description: 'Widget' })
    @ApiForbiddenResponse({ description: 'Signed in account is not an owner' })
    @ApiNotFoundResponse({ description: 'Widget not found' })
    get(@Param('widgetId') widgetId: number, @Req() { user }: Express.Request): Promise<Widget> {
        return this.widgetService.widgetGet(widgetId, user);
    }

    @Patch(':widgetId')
    @Version('1')
    @ApiOperation({ summary: 'Update a widget' })
    @ApiOkResponse({ description: 'Updated' })
    @ApiBadRequestResponse({ description: 'Invalid payload' })
    @ApiForbiddenResponse({ description: 'Signed in account is not an owner' })
    @ApiNotFoundResponse({ description: 'Widget not found' })
    update(
        @Param('widgetId') widgetId: number,
        @Body() payload: UpdateWidgetDTO,
        @Req() { user }: Express.Request,
    ): Promise<Widget> {
        return this.widgetService.widgetUpdate(widgetId, payload, user);
    }

    @Delete(':widgetId')
    @Version('1')
    @ApiOperation({ summary: 'Delete a widget' })
    @ApiOkResponse({ description: 'Deleted' })
    @ApiForbiddenResponse({ description: 'Signed in account is not an owner' })
    @ApiNotFoundResponse({ description: 'Widget not found' })
    delete(@Param('widgetId') widgetId: number, @Req() { user }: Express.Request): Promise<void> {
        return this.widgetService.widgetDelete(widgetId, user);
    }
}
