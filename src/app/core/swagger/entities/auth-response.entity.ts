import { AuthResponse } from '@modules/authentication';
import { ApiProperty } from '@nestjs/swagger';

type AccessTokenAuthResponse = AuthResponse['access'];

class AccessTokenResponseSwagger implements AccessTokenAuthResponse {
    @ApiProperty({ example: 'eyJhbG...InR5cCI6IkpXVCJ9.eyJ1c2VySWQi...Dc0ODM4ODl9.IMu2LPL8-unhy...G_uOYygkY' })
    token: string;

    @ApiProperty({ example: 1707483889213 })
    expiresAt: number;
}

type RefreshTokenAuthResponse = AuthResponse['refresh'];

class RefreshTokenResponseSwagger implements RefreshTokenAuthResponse {
    @ApiProperty({ example: 'eyJhbGci...I6IkpXVCJ9.eyJ1c2VySWQiOjIsInJv...3MDk0NzEwODl9.u2stEsVF5J...ElQqfNdZI' })
    token: string;

    @ApiProperty({ example: 1709471089214 })
    expiresAt: number;
}

export class AuthResponseSwagger implements AuthResponse {
    @ApiProperty()
    access: AccessTokenResponseSwagger;

    @ApiProperty()
    refresh: RefreshTokenResponseSwagger;
}
