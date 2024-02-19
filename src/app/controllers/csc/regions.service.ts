import { CountryEntity, RegionEntity, SubregionEntity } from '@app/database';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsSelect, Repository } from 'typeorm';

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

    findAll(select?: FindOptionsSelect<RegionEntity>): Promise<RegionEntity[]> {
        return this.regionRepository.find({ select });
    }

    findOne(regionId: number, select?: FindOptionsSelect<RegionEntity>): Promise<RegionEntity> {
        return this.regionRepository.findOne({ where: { id: regionId }, select });
    }

    findAllSubregions(regionId: number, select?: FindOptionsSelect<SubregionEntity>): Promise<SubregionEntity[]> {
        return this.subregionsService.findAllByRegion(regionId, select);
    }

    findAllCountries(regionId: number, select?: FindOptionsSelect<CountryEntity>): Promise<CountryEntity[]> {
        return this.countriesService.findAllByRegion(regionId, select);
    }
}
