import { Injectable } from '@nestjs/common';

@Injectable()
export class WidgetService {
    async init(): Promise<unknown> {
        return Promise.resolve({ ok: 'true' });
    }
}
