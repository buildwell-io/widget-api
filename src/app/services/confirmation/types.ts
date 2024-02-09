import { ConfirmationAction } from '@app/enums';

export interface SendOptions {
    action: ConfirmationAction;
    accountId: number;
    tokenLifetime: number; // milliseconds
}

export interface ConfirmOptions {
    action: ConfirmationAction;
    token: string;
    accountId: number;
}
