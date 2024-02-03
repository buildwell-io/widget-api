import { Account } from '@interfaces/account.interface';

declare global {
    /*
    * Package 'passport' extends Express namespace with `User` interface and
    * adds it to `Request` interface. We just extend that `User` interface
    * */
    namespace Express {
        interface User extends Pick<Account, 'id' | 'role'> {
        }
    }
}
