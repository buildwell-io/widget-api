import { CountryEntity, SubregionEntity } from '@app/database';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsSelect, Repository } from 'typeorm';

import { CountriesService } from './countries.service';

@Injectable()
export class SubregionsService {
    constructor(
        @InjectRepository(SubregionEntity)
        private readonly subregionRepository: Repository<SubregionEntity>,
        private readonly countriesService: CountriesService,
    ) {}

    findAll(select?: FindOptionsSelect<SubregionEntity>): Promise<SubregionEntity[]> {
        return this.subregionRepository.find({ select });
    }

    findOne(subregionId: number, select?: FindOptionsSelect<SubregionEntity>): Promise<SubregionEntity> {
        return this.subregionRepository.findOne({ where: { id: subregionId }, select });
    }

    findAllCountries(subregionId: number, select?: FindOptionsSelect<CountryEntity>): Promise<CountryEntity[]> {
        return this.countriesService.findAllBySubregion(subregionId, select);
    }

    findAllByRegion(regionId: number, select?: FindOptionsSelect<SubregionEntity>): Promise<SubregionEntity[]> {
        return this.subregionRepository.find({ where: { regionId }, select });
    }
}
