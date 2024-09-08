import { QuizStepAnswerEntity } from '@app/database';
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

import { CreateQuizStepAnswerDTO } from './dto/create-quiz-step-answer.dto';
import { UpdateQuizStepAnswerDTO } from './dto/update-quiz-step-answer.dto';
import { QuizzesStepsAnswersService } from './quizzes-steps-answers.service';

@ApiTags('quizzes')
@Controller('quizzes/:quizId/steps/:quizStepId/answers')
@AccountType(AccountTypeEnum.Company, AccountTypeEnum.CompanyMember)
@ApiBearerAuth()
@ApiHeader({ name: 'Authorization', required: true, description: 'Bearer <access_token>' })
@ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
export class QuizzesStepsAnswersController {
    constructor(private readonly quizzesStepsService: QuizzesStepsAnswersService) {}

    @Post()
    @Version('1')
    @ApiOperation({ summary: 'Create an answer' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'Success', type: QuizStepAnswerEntity })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid payload' })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Email is not confirmed' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Quiz/Step not found' })
    create(@Param('quizStepId', new ParseIntPipe()) quizStepId: number, @Body() payload: CreateQuizStepAnswerDTO, @Req() { user }: Express.Request): Promise<QuizStepAnswerEntity> {
        return this.quizzesStepsService.create(quizStepId, payload, user);
    }

    @Get()
    @Version('1')
    @ApiOperation({ summary: 'Get all answers related to the step' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: [ QuizStepAnswerEntity ] })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Authorized account is not an owner of the quiz' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Quiz/Step not found' })
    getAll(@Param('quizStepId', new ParseIntPipe()) quizStepId: number): Promise<QuizStepAnswerEntity[]> {
        return this.quizzesStepsService.getAll(quizStepId);
    }

    @Get(':quizStepAnswerId')
    @Version('1')
    @ApiOperation({ summary: 'Get a single answer' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: QuizStepAnswerEntity })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid payload' })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Authorized account is not an owner of the quiz' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Quiz/Step not found' })
    getById(@Param('quizStepAnswerId', new ParseIntPipe()) quizStepAnswerId: number): Promise<QuizStepAnswerEntity> {
        return this.quizzesStepsService.getById(quizStepAnswerId);
    }

    @Patch(':quizStepAnswerId')
    @Version('1')
    @ApiOperation({ summary: 'Update an answer' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: QuizStepAnswerEntity })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid payload' })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Authorized account is not an owner of the quiz' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Quiz/Step not found' })
    updateById(@Param('quizStepAnswerId', new ParseIntPipe()) quizStepAnswerId: number, @Body() payload: UpdateQuizStepAnswerDTO): Promise<QuizStepAnswerEntity> {
        return this.quizzesStepsService.update(quizStepAnswerId, payload);
    }

    @Delete(':quizStepAnswerId')
    @Version('1')
    @ApiOperation({ summary: 'Delete an answer' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid payload' })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Authorized account is not an owner of the quiz' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Quiz/Step not found' })
    deleteById(@Param('quizStepAnswerId', new ParseIntPipe()) quizStepAnswerId: number): Promise<void> {
        return this.quizzesStepsService.delete(quizStepAnswerId);
    }
}
