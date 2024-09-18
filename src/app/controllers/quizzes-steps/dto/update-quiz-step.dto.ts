import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateQuizStepDTO {
    @MaxLength(128)
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    @ApiProperty({ example: 'My step' })
    readonly title: string;
}
