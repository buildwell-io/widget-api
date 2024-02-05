import { Inject, Injectable } from '@nestjs/common';
import { ClientResponse } from '@sendgrid/client/src/response';
import { ResponseError } from '@sendgrid/helpers/classes';
import { MailDataRequired } from '@sendgrid/helpers/classes/mail';
import SendGrid from '@sendgrid/mail';

import { SENDGRID_OPTIONS } from './constants';

@Injectable()
export class SendgridService {
    constructor(@Inject(SENDGRID_OPTIONS) private readonly sendGridInstance: SendGrid.MailService) {
    }

    send(
        data: MailDataRequired | MailDataRequired[],
        isMultiple?: boolean,
        cb?: (err: Error | ResponseError, result: [ ClientResponse, {} ]) => void,
    ): Promise<[ ClientResponse, Record<string, any> ]> {
        return this.sendGridInstance.send(data, isMultiple, cb);
    }
}
