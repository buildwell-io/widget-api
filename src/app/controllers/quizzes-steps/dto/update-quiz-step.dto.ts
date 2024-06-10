import { QuizStepType } from '@app/enums';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateQuizStepDTO {
    @MaxLength(128)
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    @ApiProperty({ example: 'My step' })
    readonly title: string;

    @IsEnum(QuizStepType)
    @IsOptional()
    @ApiProperty({ enum: [ QuizStepType.Select, QuizStepType.Input ] })
    readonly type: QuizStepType;
}
