import { Account } from '@interfaces/account.interface';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class SignInDTO implements Pick<Account, 'email' | 'password'> {
    @ApiProperty({ example: 'john.doe@gmail.com' })
    @IsEmail()
    readonly email: string;

    @MaxLength(64)
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'P@ssw0rd' })
    readonly password: string;
}
