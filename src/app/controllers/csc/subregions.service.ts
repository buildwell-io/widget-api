import { CountryEntity, SubregionEntity } from '@app/database';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsSelect, Repository } from 'typeorm';

import { CountriesService } from './countries.service';
import { UpdateSubregionDTO } from './dto';

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

    updateOne(subregionId: number, payload: UpdateSubregionDTO): Promise<SubregionEntity> {
        return this.subregionRepository.save({ id: subregionId, ...payload });
    }

    findAllCountries(subregionId: number, select?: FindOptionsSelect<CountryEntity>): Promise<CountryEntity[]> {
        return this.countriesService.findAllBySubregion(subregionId, select);
    }

    findAllByRegion(regionId: number, select?: FindOptionsSelect<SubregionEntity>): Promise<SubregionEntity[]> {
        return this.subregionRepository.find({ where: { regionId }, select });
    }
}
