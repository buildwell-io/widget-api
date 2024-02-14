import { AccountEntity, WidgetEntity } from '@app/database';
import { Paginated, PaginationRequest } from '@app/interfaces';
import { assert } from '@app/utilities';
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { instanceToPlain } from 'class-transformer';
import { Repository } from 'typeorm';

import { CreateWidgetDTO, UpdateWidgetDTO } from './dto';

@Injectable()
export class WidgetService {
    constructor(
        @InjectRepository(WidgetEntity)
        private readonly widgetRepository: Repository<WidgetEntity>,
        @InjectRepository(AccountEntity)
        private readonly accountRepository: Repository<AccountEntity>,
    ) {}

    async create(payload: CreateWidgetDTO, { id }: Express.User): Promise<WidgetEntity> {
        const account = await this.accountRepository.findOneBy({ id });
        assert(account.hasConfirmedEmail, () => new ForbiddenException('Email is not verified'));

        const widget = new WidgetEntity();
        widget.name = payload.name;
        widget.owner = account;

        return this.widgetRepository.save(widget);
    }

    async getList({
                      pageIndex,
                      perPage,
                  }: PaginationRequest, { id: userId }: Express.User): Promise<Paginated<WidgetEntity>> {
        const carsQuery = this.widgetRepository
            .createQueryBuilder('widget')
            .orderBy('widget.id', 'ASC')
            .where('widget.ownerId = :userId', { userId })
            .take(perPage)
            .skip((pageIndex - 1) * perPage);

        const [ data, total ] = await carsQuery.getManyAndCount();

        return {
            data,
            requestPageIndex: pageIndex,
            requestPerPage: perPage,
            totalItems: total,
            totalPages: perPage ? Math.ceil(total / perPage) : 1,
        };
    }

    async getSingle(widgetId: number, user: Express.User): Promise<WidgetEntity> {
        const widget = await this.widgetRepository.findOneBy({ id: widgetId });
        assert(!!widget, () => new NotFoundException('Widget not found'));
        assert(widget.ownerId === user.id, () => new ForbiddenException('You are not an owner'));
        return widget;
    }

    async update(widgetId: number, payload: UpdateWidgetDTO, user: Express.User): Promise<WidgetEntity> {
        const widget = await this.widgetRepository.findOneBy({ id: widgetId });
        assert(!!widget, () => new NotFoundException('Widget not found'));
        assert(widget.ownerId === user.id, () => new ForbiddenException('You are not an owner'));
        return this.widgetRepository.save({ ...instanceToPlain(widget), ...payload });
    }

    async delete(widgetId: number, user: Express.User): Promise<void> {
        const widget = await this.widgetRepository.findOneBy({ id: widgetId });
        assert(!!widget, () => new NotFoundException('Widget not found'));
        assert(widget.ownerId === user.id, () => new ForbiddenException('You are not an owner'));
        await this.widgetRepository.delete({ id: widgetId });
        return Promise.resolve();
    }
}
