import { CityEntity } from '@app/database';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CitiesService {
    constructor(
        @InjectRepository(CityEntity)
        private readonly cityRepository: Repository<CityEntity>,
    ) {}

    findOne(cityId: number): Promise<CityEntity> {
        return this.cityRepository.findOneBy({ id: cityId });
    }

    findAllByState(stateId: number): Promise<CityEntity[]> {
        return this.cityRepository.findBy({ stateId });
    }

    findAllByCountry(countryId: number): Promise<CityEntity[]> {
        return this.cityRepository.findBy({ countryId });
    }
}
