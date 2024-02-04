import { ApiProperty } from '@nestjs/swagger';

export class HttpExceptionEntity {
    @ApiProperty({ example: '2024-02-03T21:56:58.835Z' })
    readonly timestamp: string;

    @ApiProperty({ example: '/api/v1/account/me' })
    readonly path: string;

    @ApiProperty({ example: 'GET' })
    readonly method: string;

    @ApiProperty({ example: 'Unauthorized / Custom message' })
    readonly message: string;

    @ApiProperty({ example: 'null' })
    readonly details: unknown;
}
