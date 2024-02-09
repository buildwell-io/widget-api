import { PASSWORD_REGEXP } from '@app/constants';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Matches } from 'class-validator';

export class SignInDTO {
    @IsEmail()
    @ApiProperty({ example: 'john.doe@gmail.com' })
    readonly email: string;

    @Matches(PASSWORD_REGEXP)
    @ApiProperty({ pattern: String(PASSWORD_REGEXP), example: 'P@ssw0rd' })
    readonly password: string;
}
