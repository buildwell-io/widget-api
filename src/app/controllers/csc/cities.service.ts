import { CityEntity } from '@app/database';
import { DBConnectionName } from '@app/enums';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsSelect, Repository } from 'typeorm';

import { UpdateCitiesDTO } from './dto';

@Injectable()
export class CitiesService {
    constructor(
        @InjectRepository(CityEntity, DBConnectionName.PostgresSQL)
        private readonly cityRepository: Repository<CityEntity>,
    ) {}

    findOne(cityId: number, select?: FindOptionsSelect<CityEntity>): Promise<CityEntity> {
        return this.cityRepository.findOne({ where: { id: cityId }, select });
    }

    updateOne(cityId: number, payload: UpdateCitiesDTO): Promise<CityEntity> {
        return this.cityRepository.save({ id: cityId, ...payload });
    }

    findAllByState(stateId: number, select?: FindOptionsSelect<CityEntity>): Promise<CityEntity[]> {
        return this.cityRepository.find({ where: { stateId }, select });
    }

    findAllByCountry(countryId: number, select?: FindOptionsSelect<CityEntity>): Promise<CityEntity[]> {
        return this.cityRepository.find({ where: { countryId }, select });
    }
}
