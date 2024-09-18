import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateQuizStepDTO {
    @MaxLength(128)
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'My step' })
    readonly title: string;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ example: 1337 })
    readonly quizId: number;
}
