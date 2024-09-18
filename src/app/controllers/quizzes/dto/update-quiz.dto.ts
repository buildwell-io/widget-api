import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class UpdateQuizDTO {
    @MaxLength(128)
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'My quiz' })
    readonly name: string;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ example: 1337 })
    readonly firstStepId: number;
}
