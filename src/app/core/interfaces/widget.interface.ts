import { Account } from './account.interface';

export interface Widget {
    id: number;
    name: string;
    owner: Account;
    ownerId: number;
    createdAt: Date;
    updatedAt: Date;
}
