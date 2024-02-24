import { ACCOUNT_TYPE_KEY } from '@app/decorators';
import { AccountType } from '@app/enums';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AccountTypeGuard implements CanActivate {
    constructor(private reflector: Reflector) {
    }

    canActivate(context: ExecutionContext): boolean {
        const requiredAccountTypes = this.reflector.getAllAndOverride<AccountType[]>(ACCOUNT_TYPE_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        /* If there are no types required, then an endpoint is available for all types */
        if (!requiredAccountTypes) {
            return true;
        }

        const request = context.switchToHttp().getRequest<Express.Request>();
        return requiredAccountTypes.includes(request.user.type);
    }
}
