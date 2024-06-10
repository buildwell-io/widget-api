import { QuizStepType } from '@app/enums';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateQuizStepDTO {
    @MaxLength(128)
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'My step' })
    readonly title: string;

    @IsEnum(QuizStepType)
    @ApiProperty({ enum: [ QuizStepType.Select, QuizStepType.Input ] })
    readonly type: QuizStepType;
}
