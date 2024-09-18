import { QuizEntity } from '@app/database';
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

import { CreateQuizDTO } from './dto/create-quiz.dto';
import { UpdateQuizDTO } from './dto/update-quiz.dto';
import { QuizzesService } from './quizzes.service';

@ApiTags('quizzes')
@Controller('quizzes')
@AccountType(AccountTypeEnum.Company, AccountTypeEnum.CompanyMember)
@ApiBearerAuth()
@ApiHeader({ name: 'Authorization', required: true, description: 'Bearer <access_token>' })
@ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
export class QuizzesController {
    constructor(private readonly quizzesService: QuizzesService) {}

    @Post()
    @Version('1')
    @ApiOperation({ summary: 'Create a quiz' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'Success', type: QuizEntity })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid payload' })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Email is not confirmed' })
    create(@Body() payload: CreateQuizDTO, @Req() { user }: Express.Request): Promise<QuizEntity> {
        return this.quizzesService.create(payload, user);
    }

    @Get()
    @Version('1')
    @ApiOperation({ summary: 'Get all logged in user\'s quizzes' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: [ QuizEntity ] })
    getAll(@Req() { user }: Express.Request): Promise<QuizEntity[]> {
        return this.quizzesService.getAll(user);
    }

    @Get(':quizId')
    @Version('1')
    @ApiOperation({ summary: 'Get a single quiz' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: QuizEntity })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid payload' })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Authorized account is not an owner of the quiz' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Quiz not found' })
    getById(@Param('quizId', new ParseIntPipe()) quizId: number, @Req() { user }: Express.Request): Promise<QuizEntity> {
        return this.quizzesService.getById(quizId, user);
    }

    @Patch(':quizId')
    @Version('1')
    @ApiOperation({ summary: 'Update a quiz' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: QuizEntity })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid payload' })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Authorized account is not an owner of the quiz' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Quiz not found' })
    update(@Param('quizId', new ParseIntPipe()) quizId: number, @Body() payload: UpdateQuizDTO, @Req() { user }: Express.Request): Promise<QuizEntity> {
        return this.quizzesService.update(quizId, payload, user);
    }

    @Delete(':quizId')
    @Version('1')
    @ApiOperation({ summary: 'Delete a quiz' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid payload' })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Authorized account is not an owner of the quiz' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Quiz not found' })
    delete(@Param('quizId', new ParseIntPipe()) quizId: number, @Req() { user }: Express.Request): Promise<void> {
        return this.quizzesService.delete(quizId, user);
    }
}
