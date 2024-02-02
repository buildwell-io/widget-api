import { Role } from '@modules/authorization/role.enum';

export interface Account {
    id: number;
    name: string;
    email: string;
    role: Role;
    password: string;
    refreshToken: string;
    createdAt: Date;
    updatedAt: Date;
}
