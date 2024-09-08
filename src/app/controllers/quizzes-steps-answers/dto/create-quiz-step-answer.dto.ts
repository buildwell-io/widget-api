import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateQuizStepAnswerDTO {
    @MaxLength(128)
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'My answer' })
    readonly text: string;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ example: 1337 })
    readonly nextStepId: number;
}
