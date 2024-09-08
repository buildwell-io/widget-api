import { QuizStepEntity } from '@app/database';
import { AccountType } from '@app/decorators';
import { AccountType as AccountTypeEnum } from '@app/enums';
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
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateQuizStepDTO } from './dto/create-quiz-step.dto';
import { UpdateQuizStepDTO } from './dto/update-quiz-step.dto';
import { QuizzesStepsService } from './quizzes-steps.service';

@ApiTags('quizzes-steps')
@Controller('quizzes/:quizId/steps')
@AccountType(AccountTypeEnum.Company, AccountTypeEnum.CompanyMember)
@ApiBearerAuth()
@ApiHeader({ name: 'Authorization', required: true, description: 'Bearer <access_token>' })
@ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
export class QuizzesStepsController {
    constructor(private readonly quizzesStepsService: QuizzesStepsService) {}

    @Post()
    @Version('1')
    @ApiOperation({ summary: 'Create a step' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'Success', type: QuizStepEntity })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid payload' })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Email is not confirmed' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Quiz not found' })
    create(@Param('quizId', new ParseIntPipe()) quizId: number, @Body() payload: CreateQuizStepDTO, @Req() { user }: Express.Request): Promise<QuizStepEntity> {
        return this.quizzesStepsService.create(quizId, payload, user);
    }

    @Get()
    @Version('1')
    @ApiOperation({ summary: 'Get all steps related to the quiz' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: [ QuizStepEntity ] })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Authorized account is not an owner of the quiz' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Step not found' })
    getAll(@Param('quizId', new ParseIntPipe()) quizId: number, @Req() { user }: Express.Request): Promise<QuizStepEntity[]> {
        return this.quizzesStepsService.getAll(quizId, user);
    }

    @Get(':quizStepId')
    @Version('1')
    @ApiOperation({ summary: 'Get a single step' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: QuizStepEntity })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid payload' })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Authorized account is not an owner of the quiz' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Step not found' })
    getById(@Param('quizStepId', new ParseIntPipe()) quizStepId: number, @Req() { user }: Express.Request): Promise<QuizStepEntity> {
        return this.quizzesStepsService.getById(quizStepId, user);
    }

    @Patch(':quizStepId')
    @Version('1')
    @ApiOperation({ summary: 'Update a step' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: QuizStepEntity })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid payload' })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Authorized account is not an owner of the quiz' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Step not found' })
    update(@Param('quizStepId', new ParseIntPipe()) quizStepId: number, @Body() payload: UpdateQuizStepDTO, @Req() { user }: Express.Request): Promise<QuizStepEntity> {
        return this.quizzesStepsService.update(quizStepId, payload, user);
    }

    @Delete(':quizStepId')
    @Version('1')
    @ApiOperation({ summary: 'Delete a step' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid payload' })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Authorized account is not an owner of the quiz' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Step not found' })
    delete(@Param('quizStepId', new ParseIntPipe()) quizStepId: number, @Req() { user }: Express.Request): Promise<void> {
        return this.quizzesStepsService.delete(quizStepId, user);
    }
}
