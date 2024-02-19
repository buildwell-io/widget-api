import { CityEntity, CountryEntity, StateEntity } from '@app/database';
import { Controller, Get, HttpStatus, Param, ParseIntPipe, Version } from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';

import { CitiesService } from './cities.service';
import { CountriesService } from './countries.service';

@ApiTags('csc')
@Controller('csc/countries')
@Throttle({ default: { limit: 16, ttl: 60_000 } })
@ApiBearerAuth()
@ApiHeader({ name: 'Authorization', required: true, description: 'Bearer <access_token>' })
@ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
@ApiResponse({ status: HttpStatus.TOO_MANY_REQUESTS, description: 'Too many requests (16/min)' })
export class CountriesController {
    constructor(
        private readonly countriesService: CountriesService,
        private readonly citiesService: CitiesService,
    ) {}

    @Get()
    @Version('1')
    @ApiOperation({ summary: 'Get all countries' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: [ CountryEntity ] })
    findAll(): Promise<CountryEntity[]> {
        return this.countriesService.findAll();
    }

    @Get(':countryId')
    @Version('1')
    @ApiOperation({ summary: 'Get a single country' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: CountryEntity })
    findOne(@Param('countryId', new ParseIntPipe()) countryId: number): Promise<CountryEntity> {
        return this.countriesService.findOne(countryId);
    }

    @Get(':countryId/states')
    @Version('1')
    @ApiOperation({ summary: 'Get all single country states' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: [ StateEntity ] })
    findAllStates(@Param('countryId', new ParseIntPipe()) countryId: number): Promise<StateEntity[]> {
        return this.countriesService.findAllStates(countryId);
    }

    @Get(':countryId/cities')
    @Version('1')
    @ApiOperation({ summary: 'Get all single country cities' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: [ CityEntity ] })
    findAllCities(@Param('countryId', new ParseIntPipe()) countryId: number): Promise<CityEntity[]> {
        return this.citiesService.findAllByCountry(countryId);
    }
}
