import { PASSWORD_REGEXP } from '@app/constants';
import { AccountType } from '@app/enums';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsIn, IsNotEmpty, IsString, Matches, MaxLength } from 'class-validator';

export class SignUpDTO {
    @IsIn([ AccountType.Client, AccountType.Company ])
    @ApiProperty({ enum: [ AccountType.Client, AccountType.Company ], example: AccountType.Client })
    readonly type: AccountType;

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
