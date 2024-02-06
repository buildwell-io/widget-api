import { Widget } from '@core/interfaces';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UpdateWidgetDTO implements Pick<Widget, 'name'> {
    @MaxLength(64)
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'John Doe' })
    readonly name: string;
}
