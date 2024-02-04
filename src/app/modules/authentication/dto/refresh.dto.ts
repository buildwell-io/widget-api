import { Account } from '@core/interfaces';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshDTO implements Pick<Account, 'refreshToken'> {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    readonly refreshToken: string;
}
