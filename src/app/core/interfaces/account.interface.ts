import { Role } from '@modules/authorization';

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
