import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UpdateWidgetDTO {
    @MaxLength(128)
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'John Doe' })
    readonly name: string;
}
