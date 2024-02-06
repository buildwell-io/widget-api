import { applyDecorators, Type } from '@nestjs/common';
import { ApiOkResponse, ApiResponseOptions, getSchemaPath } from '@nestjs/swagger';

export const ApiPaginationOkResponse = <M extends Type<any>>(model: M, options?: ApiResponseOptions) => {
    return applyDecorators(
        ApiOkResponse({
            ...options,
            schema: {
                allOf: [
                    {
                        properties: {
                            data: {
                                type: 'array',
                                description: 'Array of paginated data',
                                items: {
                                    $ref: getSchemaPath(model),
                                },
                            },
                        },
                    },
                    {
                        properties: {
                            requestPageIndex: {
                                type: 'number',
                                description: 'pageIndex from the request',
                                example: 1,
                            },
                            requestPerPage: {
                                type: 'number',
                                description: 'perPage from the request',
                                example: 10,
                            },
                            totalItems: {
                                type: 'number',
                                description: 'Total number of items in a database',
                                example: 20,
                            },
                            totalPages: {
                                type: 'number',
                                description: 'Total number of pages, based on perPage requested',
                                example: 2,
                            },
                        },
                    },
                ],
            },
        }),
    );
};
