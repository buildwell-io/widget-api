import { CountryEntity, SubregionEntity } from '@app/database';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CountriesService } from './countries.service';

@Injectable()
export class SubregionsService {
    constructor(
        @InjectRepository(SubregionEntity)
        private readonly subregionRepository: Repository<SubregionEntity>,
        private readonly countriesService: CountriesService,
    ) {}

    findAll(): Promise<SubregionEntity[]> {
        return this.subregionRepository.find();
    }

    findOne(subregionId: number): Promise<SubregionEntity> {
        return this.subregionRepository.findOneBy({ id: subregionId });
    }

    findAllCountries(subregionId: number): Promise<CountryEntity[]> {
        return this.countriesService.findAllBySubregion(subregionId);
    }

    findAllByRegion(regionId: number): Promise<SubregionEntity[]> {
        return this.subregionRepository.findBy({ regionId });
    }
}
