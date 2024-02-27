import { CountryEntity, StateEntity } from '@app/database';
import { DBConnectionName } from '@app/enums';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsSelect, Repository } from 'typeorm';

import { UpdateCountryDTO } from './dto';
import { StatesService } from './states.service';

@Injectable()
export class CountriesService {
    constructor(
        @InjectRepository(CountryEntity, DBConnectionName.PostgresSQL)
        private readonly countryRepository: Repository<CountryEntity>,
        private readonly statesService: StatesService,
    ) {}

    findAll(select?: FindOptionsSelect<CountryEntity>): Promise<CountryEntity[]> {
        return this.countryRepository.find({ select });
    }

    findOne(countryId: number, select?: FindOptionsSelect<CountryEntity>): Promise<CountryEntity> {
        return this.countryRepository.findOne({ where: { id: countryId }, select });
    }

    updateOne(countryId: number, payload: UpdateCountryDTO): Promise<CountryEntity> {
        return this.countryRepository.save({ id: countryId, ...payload });
    }

    findAllStates(countryId: number, select?: FindOptionsSelect<StateEntity>): Promise<StateEntity[]> {
        return this.statesService.findAllByCountry(countryId, select);
    }

    findAllByRegion(regionId: number, select?: FindOptionsSelect<CountryEntity>): Promise<CountryEntity[]> {
        return this.countryRepository.find({ where: { regionId }, select });
    }

    findAllBySubregion(subregionId: number, select?: FindOptionsSelect<CountryEntity>): Promise<CountryEntity[]> {
        return this.countryRepository.find({ where: { subregionId }, select });
    }
}
