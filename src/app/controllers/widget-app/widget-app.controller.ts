import { Public } from '@app/decorators';
import { Controller, Get, HttpStatus, Req } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { WidgetAppService } from './widget-app.service';

@ApiTags('widget-app')
@Controller('widget-app')
// @Throttle({ default: { limit: 3, ttl: 60_000 } })
@Public()
@ApiResponse({ status: HttpStatus.TOO_MANY_REQUESTS, description: 'Too many requests (3/min)' })
export class WidgetAppController {
    constructor(private readonly widgetAppService: WidgetAppService) {}

    @Get()
    async get(@Req() req: Express.Request) {
        console.log('');
        console.log('====================');
        console.log('====================');
        console.log(req);
        return { ok: true };
    }
}
