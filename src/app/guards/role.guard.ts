import { ROLES_KEY } from '@app/decorators';
import { AccountRole } from '@app/enums';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private reflector: Reflector) {
    }

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<AccountRole[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        /* If there are no roles required, then an endpoint is available for all roles */
        if (!requiredRoles) {
            return true;
        }

        const request = context.switchToHttp().getRequest<Express.Request>();
        return requiredRoles.includes(request.user.role);
    }
}
