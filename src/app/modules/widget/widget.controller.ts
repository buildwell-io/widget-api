import { Controller, Get, Req, Version } from '@nestjs/common';
import { Request } from 'express';
import { PublicApi } from '@modules/authentication/decorators/public-api.decorator';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { WidgetService } from '@modules/widget/widget.service';

@ApiTags('widget')
@Controller('widget')
export class WidgetController {
    constructor(private readonly widgetService: WidgetService) {
    }

    @Get('init')
    @Version('1')
    @PublicApi()
    @ApiOperation({ summary: 'Check the widget availability' })
    @ApiOkResponse({ description: '' }) // type
    @ApiNotFoundResponse({ description: 'No associated widget with' })
    init(@Req() request: Request) {
        console.log('widget/init request:', request);
        return this.widgetService.init();
    }
}
