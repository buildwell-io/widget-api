import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientResponse } from '@sendgrid/client/src/response';
import { ResponseError } from '@sendgrid/helpers/classes';
import { MailDataRequired } from '@sendgrid/helpers/classes/mail';
import * as sgMail from '@sendgrid/mail';

@Injectable()
export class MailService {
    private readonly logger = new Logger('MailService');

    constructor(configService: ConfigService) {
        sgMail.setApiKey(configService.get('SENDGRID_API_KEY'));
    }

    sendFrom(from: string): Promise<boolean> {
        return Promise.resolve(true);
    }

    private send(
        data: MailDataRequired | MailDataRequired[],
        isMultiple?: boolean,
        cb?: (err: Error | ResponseError, result: [ ClientResponse, Record<string, any> ]) => void,
    ): Promise<[ ClientResponse, Record<string, any> ]> {
        return sgMail.send(data, isMultiple, cb);
    }
}
