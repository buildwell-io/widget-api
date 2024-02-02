import { Account } from '@interfaces/account.interface';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshDTO implements Pick<Account, 'refreshToken'> {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    readonly refreshToken: string;
}
