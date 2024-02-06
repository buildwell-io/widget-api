import { WidgetEntity } from '@core/database';
import { Widget } from '@core/interfaces';
import { assert } from '@core/utils';
import { AccountService } from '@modules/account';
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateWidgetDTO, UpdateWidgetDTO } from './dto';

@Injectable()
export class WidgetService {
    constructor(
        @InjectRepository(WidgetEntity) private readonly widgetRepository: Repository<Widget>,
        private readonly accountService: AccountService,
    ) {}

    async widgetCreate(payload: CreateWidgetDTO, user: Express.User): Promise<Widget> {
        assert(await this.accountService.isEmailVerified(user.id), () => new ForbiddenException('Email is not verified'));

        const owner = await this.accountService.get(user.id);
        const widget = this.widgetRepository.create(payload);
        widget.owner = owner;
        return await this.widgetRepository.save(widget);
    }

    async widgetGetList(pagination: PaginationRequest, user: Express.User): Promise<Paginated<Widget>> {
        const carsQuery = this.widgetRepository
            .createQueryBuilder('widget')
            .orderBy('widget.id', 'ASC')
            .where('widget.ownerId = :userId', { userId: user.id })
            .take(pagination.perPage)
            .skip((pagination.pageIndex - 1) * pagination.perPage);

        const [ data, total ] = await carsQuery.getManyAndCount();

        return {
            data,
            requestPageIndex: pagination.pageIndex,
            requestPerPage: pagination.perPage,
            totalItems: total,
            totalPages: pagination.perPage ? Math.ceil(total / pagination.perPage) : 1,
        };
    }

    async widgetGet(widgetId: number, user: Express.User): Promise<Widget> {
        assert(await this.exists(widgetId), () => new NotFoundException('Widget not found'));
        assert(await this.isOwner(widgetId, user.id), () => new ForbiddenException('You are not an owner'));

        return this.get(widgetId);
    }

    async widgetUpdate(widgetId: number, payload: UpdateWidgetDTO, user: Express.User): Promise<Widget> {
        assert(await this.exists(widgetId), () => new NotFoundException('Widget not found'));
        assert(await this.isOwner(widgetId, user.id), () => new ForbiddenException('You are not an owner'));

        await this.widgetRepository.update({ id: widgetId }, payload);
        return this.widgetRepository.findOneBy({ id: widgetId });
    }

    async widgetDelete(widgetId: number, user: Express.User): Promise<void> {
        assert(await this.exists(widgetId), () => new NotFoundException('Widget not found'));
        assert(await this.isOwner(widgetId, user.id), () => new ForbiddenException('You are not an owner'));

        await this.widgetRepository.delete({ id: widgetId });
        return Promise.resolve();
    }

    async get(widgetId: number): Promise<Widget> {
        return this.widgetRepository.findOneBy({ id: widgetId });
    }

    async exists(widgetId: number): Promise<boolean> {
        return this.widgetRepository.existsBy({ id: widgetId });
    }

    async isOwner(widgetId: number, userId: number): Promise<boolean> {
        return (await this.get(widgetId)).ownerId === userId;
    }
}
