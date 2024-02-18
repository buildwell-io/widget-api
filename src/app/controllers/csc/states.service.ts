import { StateEntity } from '@app/database';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class StatesService {
    constructor(
        @InjectRepository(StateEntity)
        private readonly stateRepository: Repository<StateEntity>,
    ) {}

    findOne(stateId: number): Promise<StateEntity> {
        return this.stateRepository.findOneBy({ id: stateId });
    }

    findAllByCountry(countryId: number): Promise<StateEntity[]> {
        return this.stateRepository.findBy({ countryId });
    }
}
