import { CountryEntity, StateEntity } from '@app/database';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { StatesService } from './states.service';

@Injectable()
export class CountriesService {
    constructor(
        @InjectRepository(CountryEntity)
        private readonly countryRepository: Repository<CountryEntity>,
        private readonly statesService: StatesService,
    ) {}

    findAll(): Promise<CountryEntity[]> {
        return this.countryRepository.find();
    }

    findOne(countryId: number): Promise<CountryEntity> {
        return this.countryRepository.findOneBy({ id: countryId });
    }

    findAllStates(countryId: number): Promise<StateEntity[]> {
        return this.statesService.findAllByCountry(countryId);
    }

    findAllByRegion(regionId: number): Promise<CountryEntity[]> {
        return this.countryRepository.findBy({ regionId });
    }

    findAllBySubregion(subregionId: number): Promise<CountryEntity[]> {
        return this.countryRepository.findBy({ subregionId });
    }
}
