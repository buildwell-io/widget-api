import { HttpErrorResponse } from '@app/interfaces';
import { ApiProperty } from '@nestjs/swagger';

export class HttpErrorResponseEntity implements HttpErrorResponse {
    @ApiProperty({
        type: 'string',
        example: 'Some error string',
    })
    error: string;

    @ApiProperty({
        type: 'number',
        example: 404,
    })
    status: number;
}
