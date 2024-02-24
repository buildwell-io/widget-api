import { AccountType as AccountTypeEnum } from '@app/enums';
import { SetMetadata } from '@nestjs/common';

export const ACCOUNT_TYPE_KEY = 'account_type';
export const AccountType = (...types: AccountTypeEnum[]) => SetMetadata(ACCOUNT_TYPE_KEY, types);
