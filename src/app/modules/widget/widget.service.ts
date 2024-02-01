import { Injectable } from '@nestjs/common';

@Injectable()
export class WidgetService {
    init() {
        return { ok: true };
    }
}
