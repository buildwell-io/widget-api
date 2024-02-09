import { PASSWORD_REGEXP } from '@app/constants';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength } from 'class-validator';

export class SignUpDTO {
    @MaxLength(128)
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'John Doe' })
    readonly name: string;

    @ApiProperty({ example: 'john.doe@gmail.com' })
    @IsEmail()
    readonly email: string;

    @Matches(PASSWORD_REGEXP)
    @ApiProperty({ pattern: String(PASSWORD_REGEXP), example: 'P@ssw0rd' })
    readonly password: string;
}
