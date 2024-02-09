import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

import { PUBLIC_API_KEY } from '../decorators/public-api.decorator';

@Injectable()
export class AccessTokenGuard extends AuthGuard('jwt') implements CanActivate {
    constructor(private reflector: Reflector) {
        super();
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(PUBLIC_API_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        return isPublic || super.canActivate(context);
    }
}
