import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class EmailVerificationVerifyDTO {
    @Length(6)
    @IsString()
    @ApiProperty({ example: '123321' })
    readonly totp: string;
}
