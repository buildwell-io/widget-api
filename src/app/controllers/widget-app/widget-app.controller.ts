import { QuizEntity, QuizStepAnswerEntity, QuizStepEntity } from '@app/database';
import { Public } from '@app/decorators';
import { Controller, Get, HttpStatus, Param, ParseIntPipe, ParseUUIDPipe, Query, Version } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { WidgetAppService } from './widget-app.service';

@ApiTags('widget-app')
@Controller('widget-app')
@Public()
export class WidgetAppController {
    constructor(private readonly widgetAppService: WidgetAppService) {}

    @Get('verify')
    @Version('1')
    @ApiQuery({ name: 'key', type: String, example: '66aec774-2778-4363-ada3-628df95304d8' })
    @ApiQuery({ name: 'referrer', type: String, example: 'https://buildwell.io' })
    @ApiOperation({ summary: 'Verify a widget before its bootstrap' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid key or referrer' })
    async verify(@Query('key', new ParseUUIDPipe({ version: '4' })) key: string, @Query('referrer') referrer: string): Promise<void> {
        return this.widgetAppService.verify(key, referrer);
    }

    @Get('quiz/:quizId')
    @Version('1')
    @ApiOperation({ summary: 'Get a single quiz' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: QuizEntity })
    getQuiz(@Param('quizId', new ParseIntPipe()) quizId: number): Promise<QuizEntity> {
        return this.widgetAppService.getQuiz(quizId);
    }

    @Get('quiz-step/:stepId')
    @Version('1')
    @ApiOperation({ summary: 'Get a single step' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: QuizStepEntity })
    getStep(@Param('stepId', new ParseIntPipe()) stepId: number): Promise<QuizStepEntity> {
        return this.widgetAppService.getStep(stepId);
    }

    @Get('quiz-step-answers/:stepId')
    @Version('1')
    @ApiOperation({ summary: 'Get a single step answers' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: [ QuizStepAnswerEntity ] })
    getStepAnswers(@Param('stepId', new ParseIntPipe()) stepId: number): Promise<QuizStepAnswerEntity[]> {
        return this.widgetAppService.getStepAnswers(stepId);
    }
}
