import { Controller, Get, Version } from '@nestjs/common';
import { WidgetService } from './widget.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('widget')
@Controller('widget')
export class WidgetController {
  constructor(private readonly widgetService: WidgetService) {}

  @Get('init')
  @Version('1')
  @ApiOperation({ summary: 'Check the widget availability' })
  getData() {
    return this.widgetService.init();
  }
}
