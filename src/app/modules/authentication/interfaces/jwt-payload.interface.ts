import { Role } from '@modules/authorization/role.enum';

export interface JWTPayload {
    userId: number;
    role: Role;
}
