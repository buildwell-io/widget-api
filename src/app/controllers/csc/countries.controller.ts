import { CityEntity, CountryEntity, StateEntity } from '@app/database';
import { Public } from '@app/decorators';
import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CitiesService } from './cities.service';
import { CountriesService } from './countries.service';

@ApiTags('csc')
@Controller('csc/countries')
@Public()
export class CountriesController {
    constructor(
        private readonly countriesService: CountriesService,
        private readonly citiesService: CitiesService,
    ) {}

    @Get()
    findAll(): Promise<CountryEntity[]> {
        return this.countriesService.findAll();
    }

    @Get(':countryId')
    findOne(@Param('countryId', new ParseIntPipe()) countryId: number): Promise<CountryEntity> {
        return this.countriesService.findOne(countryId);
    }

    @Get(':countryId/states')
    findAllStates(@Param('countryId', new ParseIntPipe()) countryId: number): Promise<StateEntity[]> {
        return this.countriesService.findAllStates(countryId);
    }

    @Get(':countryId/cities')
    findAllCities(@Param('countryId', new ParseIntPipe()) countryId: number): Promise<CityEntity[]> {
        return this.citiesService.findAllByCountry(countryId);
    }
}
