import { CountryEntity, RegionEntity, SubregionEntity } from '@app/database';
import { AccountType } from '@app/decorators';
import { AccountType as AccountTypeEnum } from '@app/enums';
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

import { CountriesQueryParamsDTO, RegionsQueryParamsDTO, SubregionsQueryParamsDTO, UpdateRegionDTO } from './dto';
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
    @ApiQuery({ name: 'fields', type: 'string[]', required: false, example: 'id,name' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: [ RegionEntity ] })
    findAll(
        @Query(new ValidationPipe({ transform: true })) queryParams: RegionsQueryParamsDTO,
    ): Promise<RegionEntity[]> {
        return this.regionService.findAll(queryParams.fields);
    }

    @Get(':regionId')
    @Version('1')
    @ApiOperation({ summary: 'Get a single region' })
    @ApiQuery({ name: 'fields', type: 'string[]', required: false, example: 'id,name' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: RegionEntity })
    findOne(
        @Param('regionId', new ParseIntPipe()) regionId: number,
        @Query(new ValidationPipe({ transform: true })) queryParams: RegionsQueryParamsDTO,
    ): Promise<RegionEntity> {
        return this.regionService.findOne(regionId, queryParams.fields);
    }

    @Patch(':regionId')
    @Version('1')
    @AccountType(AccountTypeEnum.Admin)
    @ApiOperation({ summary: 'Update a region' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: RegionEntity })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid payload' })
    updateOne(
        @Param('regionId', new ParseIntPipe()) regionId: number,
        @Body() payload: UpdateRegionDTO,
    ): Promise<RegionEntity> {
        return this.regionService.updateOne(regionId, payload);
    }

    @Get(':regionId/subregions')
    @Version('1')
    @ApiOperation({ summary: 'Get single region subregions' })
    @ApiQuery({ name: 'fields', type: 'string[]', required: false, example: 'id,name' })
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
    @ApiQuery({ name: 'fields', type: 'string[]', required: false, example: 'id,name' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: [ CountryEntity ] })
    findAllCountries(
        @Param('regionId', new ParseIntPipe()) regionId: number,
        @Query(new ValidationPipe({ transform: true })) queryParams: CountriesQueryParamsDTO,
    ): Promise<CountryEntity[]> {
        return this.regionService.findAllCountries(regionId, queryParams.fields);
    }
}
