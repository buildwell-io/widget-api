import { CountryEntity, SubregionEntity } from '@app/database';
import { Controller, Get, HttpStatus, Param, ParseIntPipe, Version } from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';

import { SubregionsService } from './subregions.service';

@ApiTags('csc')
@Controller('csc/subregions')
@Throttle({ default: { limit: 16, ttl: 60_000 } })
@ApiBearerAuth()
@ApiHeader({ name: 'Authorization', required: true, description: 'Bearer <access_token>' })
@ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
@ApiResponse({ status: HttpStatus.TOO_MANY_REQUESTS, description: 'Too many requests (16/min)' })
export class SubregionsController {
    constructor(private readonly subregionsService: SubregionsService) {}

    @Get()
    @Version('1')
    @ApiOperation({ summary: 'Get all subregions' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: [ SubregionEntity ] })
    findAll(): Promise<SubregionEntity[]> {
        return this.subregionsService.findAll();
    }

    @Get(':subregionId')
    @Version('1')
    @ApiOperation({ summary: 'Get a single subregion' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: SubregionEntity })
    findOne(@Param('subregionId', new ParseIntPipe()) subregionId: number): Promise<SubregionEntity> {
        return this.subregionsService.findOne(subregionId);
    }

    @Get(':subregionId/countries')
    @Version('1')
    @ApiOperation({ summary: 'Get all single subregion countries' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: [ CountryEntity ] })
    findAllCountries(@Param('subregionId', new ParseIntPipe()) subregionId: number): Promise<CountryEntity[]> {
        return this.subregionsService.findAllCountries(subregionId);
    }
}
