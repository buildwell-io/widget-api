import { BadRequestException, createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Pagination = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const pageIndex = parseInt(request.query.pageIndex, 10);
    const perPage = parseInt(request.query.perPage, 10);

    if (Number.isNaN(pageIndex) || pageIndex < 1) {
        throw new BadRequestException('Invalid pageIndex');
    }

    if (Number.isNaN(perPage) || perPage < 1) {
        throw new BadRequestException('Invalid perPage');
    }

    return { pageIndex, perPage };
});
