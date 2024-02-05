import { Account } from '@core/interfaces';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MaxLength } from 'class-validator';

import { PASSWORD_REGEXP } from '../constants';

export class SignUpDTO implements Pick<Account, 'name' | 'email' | 'password'> {
    @MaxLength(64)
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    @ApiProperty({ example: 'John Doe', required: false })
    readonly name: string;

    @ApiProperty({ example: 'john.doe@gmail.com' })
    @IsEmail()
    readonly email: string;

    @Matches(PASSWORD_REGEXP)
    @ApiProperty({ pattern: String(PASSWORD_REGEXP), example: 'P@ssw0rd' })
    readonly password: string;
}
