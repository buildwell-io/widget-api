import { AuthResponse } from '@app/interfaces';
import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseSwagger implements AuthResponse {
    @ApiProperty({ example: 'eyJhbGci...I6IkpXVCJ9.eyJ1c2VySWQiOjIsInJv...3MDk0NzEwODl9.u2stEsVF5J...ElQqfNdZI' })
    accessToken: string;

    @ApiProperty({ example: 'eyJhbGci...I6IkpXVCJ9.eyJ1c2VySWQiOjIsInJv...3MDk0NzEwODl9.u2stEsVF5J...ElQqfNdZI' })
    refreshToken: string;
}
