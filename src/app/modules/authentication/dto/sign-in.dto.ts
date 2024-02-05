import { Account } from '@core/interfaces';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Matches } from 'class-validator';

import { PASSWORD_REGEXP } from '../constants';

export class SignInDTO implements Pick<Account, 'email' | 'password'> {
    @IsEmail()
    @ApiProperty({ example: 'john.doe@gmail.com' })
    readonly email: string;

    @Matches(PASSWORD_REGEXP)
    @ApiProperty({ pattern: String(PASSWORD_REGEXP), example: 'P@ssw0rd' })
    readonly password: string;
}
