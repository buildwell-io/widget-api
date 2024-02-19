import { CountryEntity, RegionEntity, SubregionEntity } from '@app/database';
import { Controller, Get, HttpStatus, Param, ParseIntPipe, Query, ValidationPipe, Version } from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';

import { CountriesQueryParamsDTO, RegionsQueryParamsDTO, SubregionsQueryParamsDTO } from './dto';
import { RegionsService } from './regions.service';

@ApiTags('csc')
@Controller('csc/regions')
@Throttle({ default: { limit: 16, ttl: 60_000 } })
@ApiBearerAuth()
@ApiHeader({ name: 'Authorization', required: true, description: 'Bearer <access_token>' })
@ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
@ApiResponse({ status: HttpStatus.TOO_MANY_REQUESTS, description: 'Too many requests (16/min)' })
export class RegionsController {
    constructor(private readonly regionService: RegionsService) {}

    @Get()
    @Version('1')
    @ApiOperation({ summary: 'Get all regions' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: [ RegionEntity ] })
    findAll(
        @Query(new ValidationPipe({ transform: true })) queryParams: RegionsQueryParamsDTO,
    ): Promise<RegionEntity[]> {
        return this.regionService.findAll(queryParams.fields);
    }

    @Get(':regionId')
    @Version('1')
    @ApiOperation({ summary: 'Get a single region' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: RegionEntity })
    findOne(
        @Param('regionId', new ParseIntPipe()) regionId: number,
        @Query(new ValidationPipe({ transform: true })) queryParams: RegionsQueryParamsDTO,
    ): Promise<RegionEntity> {
        return this.regionService.findOne(regionId, queryParams.fields);
    }

    @Get(':regionId/subregions')
    @Version('1')
    @ApiOperation({ summary: 'Get single region subregions' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: [ SubregionEntity ] })
    findAllSubregions(
        @Param('regionId', new ParseIntPipe()) regionId: number,
        @Query(new ValidationPipe({ transform: true })) queryParams: SubregionsQueryParamsDTO,
    ): Promise<SubregionEntity[]> {
        return this.regionService.findAllSubregions(regionId, queryParams.fields);
    }

    @Get(':regionId/countries')
    @Version('1')
    @ApiOperation({ summary: 'Get single region countries' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: [ CountryEntity ] })
    findAllCountries(
        @Param('regionId', new ParseIntPipe()) regionId: number,
        @Query(new ValidationPipe({ transform: true })) queryParams: CountriesQueryParamsDTO,
    ): Promise<CountryEntity[]> {
        return this.regionService.findAllCountries(regionId, queryParams.fields);
    }
}
