import { Public } from '@app/decorators';
import { Controller, Get, HttpStatus, ParseUUIDPipe, Query, Version } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';

import { WidgetAppService } from './widget-app.service';

@ApiTags('widget-app')
@Controller('widget-app')
@Throttle({ default: { limit: 3, ttl: 60_000 } })
@Public()
@ApiResponse({ status: HttpStatus.TOO_MANY_REQUESTS, description: 'Too many requests (3/min)' })
export class WidgetAppController {
    constructor(private readonly widgetAppService: WidgetAppService) {}

    @Get('verify')
    @Version('1')
    @ApiQuery({ name: 'key', type: String, example: '66aec774-2778-4363-ada3-628df95304d8' })
    @ApiQuery({ name: 'referrer', type: String, example: 'https://buildwell.io' })
    @ApiOperation({ summary: 'Verify a widget before its bootstrap' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid key or referrer' })
    async verify(
        @Query('key', new ParseUUIDPipe({ version: '4' })) key: string,
        @Query('referrer') referrer: string,
    ) {
        return this.widgetAppService.verify(key, referrer);
    }
}
