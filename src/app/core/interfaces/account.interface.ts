import { Role } from '@modules/authorization';

export interface Account {
    id: number;
    name: string;
    email: string;
    role: Role;
    totpSecret: string | null;
    totpCreatedAt: number | null;
    isEmailVerified: boolean;
    password: string;
    refreshToken: string | null;
    createdAt: Date;
    updatedAt: Date;
}
