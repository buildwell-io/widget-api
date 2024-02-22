import { CityEntity, CountryEntity, RegionEntity, StateEntity } from '@app/database';
import {
    Body,
    Controller,
    Get,
    HttpStatus,
    Param,
    ParseIntPipe,
    Patch,
    Query,
    ValidationPipe,
    Version,
} from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';

import { CitiesService } from './cities.service';
import { CountriesService } from './countries.service';
import { CitiesQueryParamsDTO, CountriesQueryParamsDTO, UpdateCountryDTO, UpdateRegionDTO } from './dto';

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
    @ApiQuery({ name: 'fields', type: 'string[]', required: false, example: 'id,name' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: [ CountryEntity ] })
    findAll(
        @Query(new ValidationPipe({ transform: true })) queryParams: CountriesQueryParamsDTO,
    ): Promise<CountryEntity[]> {
        return this.countriesService.findAll(queryParams.fields);
    }

    @Get(':countryId')
    @Version('1')
    @ApiOperation({ summary: 'Get a single country' })
    @ApiQuery({ name: 'fields', type: 'string[]', required: false, example: 'id,name' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: CountryEntity })
    findOne(
        @Param('countryId', new ParseIntPipe()) countryId: number,
        @Query(new ValidationPipe({ transform: true })) queryParams: CountriesQueryParamsDTO,
    ): Promise<CountryEntity> {
        return this.countriesService.findOne(countryId, queryParams.fields);
    }

    @Patch(':countryId')
    @Version('1')
    @ApiOperation({ summary: 'Update a country' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: CountryEntity })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid payload' })
    updateOne(
        @Param('countryId', new ParseIntPipe()) countryId: number,
        @Body() payload: UpdateCountryDTO,
    ): Promise<CountryEntity> {
        return this.countriesService.updateOne(countryId, payload);
    }

    @Get(':countryId/states')
    @Version('1')
    @ApiOperation({ summary: 'Get all single country states' })
    @ApiQuery({ name: 'fields', type: 'string[]', required: false, example: 'id,name' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: [ StateEntity ] })
    findAllStates(
        @Param('countryId', new ParseIntPipe()) countryId: number,
        @Query(new ValidationPipe({ transform: true })) queryParams: CountriesQueryParamsDTO,
    ): Promise<StateEntity[]> {
        return this.countriesService.findAllStates(countryId, queryParams.fields);
    }

    @Get(':countryId/cities')
    @Version('1')
    @ApiOperation({ summary: 'Get all single country cities' })
    @ApiQuery({ name: 'fields', type: 'string[]', required: false, example: 'id,name' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: [ CityEntity ] })
    findAllCities(
        @Param('countryId', new ParseIntPipe()) countryId: number,
        @Query(new ValidationPipe({ transform: true })) queryParams: CitiesQueryParamsDTO,
    ): Promise<CityEntity[]> {
        return this.citiesService.findAllByCountry(countryId, queryParams.fields);
    }
}
