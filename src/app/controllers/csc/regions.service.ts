import { CountryEntity, RegionEntity, SubregionEntity } from '@app/database';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CountriesService } from './countries.service';
import { SubregionsService } from './subregions.service';

@Injectable()
export class RegionsService {
    constructor(
        @InjectRepository(RegionEntity)
        private readonly regionRepository: Repository<RegionEntity>,
        private readonly subregionsService: SubregionsService,
        private readonly countriesService: CountriesService,
    ) {}

    findAll(): Promise<RegionEntity[]> {
        return this.regionRepository.find();
    }

    findOne(regionId: number): Promise<RegionEntity> {
        return this.regionRepository.findOneBy({ id: regionId });
    }

    findAllSubregions(regionId: number): Promise<SubregionEntity[]> {
        return this.subregionsService.findAllByRegion(regionId);
    }

    findAllCountries(regionId: number): Promise<CountryEntity[]> {
        return this.countriesService.findAllByRegion(regionId);
    }
}
