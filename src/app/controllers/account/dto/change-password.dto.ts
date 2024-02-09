import { PASSWORD_REGEXP } from '@app/constants';
import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, Matches } from 'class-validator';

export class ChangePasswordDTO {
    @Matches(PASSWORD_REGEXP)
    @ApiProperty({ pattern: String(PASSWORD_REGEXP), example: 'P@ssw0rd' })
    readonly oldPassword: string;

    @Matches(PASSWORD_REGEXP)
    @ApiProperty({ pattern: String(PASSWORD_REGEXP), example: 'P@ssw0rd' })
    readonly newPassword: string;

    @IsUUID(4)
    @ApiProperty({ example: '66aec774-2778-4363-ada3-628df95304d8' })
    readonly token: string;
}
