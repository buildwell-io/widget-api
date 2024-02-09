import { ConfirmationAction } from '@app/enums';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';

export class SendDTO {
    @IsEnum(ConfirmationAction)
    @ApiProperty({ enum: [ ConfirmationAction.EmailConfirm, ConfirmationAction.PasswordChange ] })
    readonly action: ConfirmationAction;
}
