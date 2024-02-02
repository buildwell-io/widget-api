import { Controller, Get, Version } from '@nestjs/common';
import { WidgetService } from './widget.service';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('widget')
@Controller('widget')
export class WidgetController {
    constructor(private readonly widgetService: WidgetService) {
    }

    @Get('init')
    @Version('1')
    @ApiOperation({ summary: 'Check the widget availability' })
    @ApiOkResponse({ description: '' }) // type
    @ApiNotFoundResponse({ description: 'No associated widget with' })
    getData() {
        return this.widgetService.init();
    }
}
