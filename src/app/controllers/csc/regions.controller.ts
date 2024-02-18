import { CountryEntity, RegionEntity, SubregionEntity } from '@app/database';
import { Public } from '@app/decorators';
import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { RegionsService } from './regions.service';

@ApiTags('csc')
@Controller('csc/regions')
@Public()
export class RegionsController {
    constructor(private readonly regionService: RegionsService) {}

    @Get()
    findAll(): Promise<RegionEntity[]> {
        return this.regionService.findAll();
    }

    @Get(':regionId')
    findOne(@Param('regionId', new ParseIntPipe()) regionId: number): Promise<RegionEntity> {
        return this.regionService.findOne(regionId);
    }

    @Get(':regionId/subregions')
    findAllSubregions(@Param('regionId', new ParseIntPipe()) regionId: number): Promise<SubregionEntity[]> {
        return this.regionService.findAllSubregions(regionId);
    }

    @Get(':regionId/countries')
    findAllCountries(@Param('regionId', new ParseIntPipe()) regionId: number): Promise<CountryEntity[]> {
        return this.regionService.findAllCountries(regionId);
    }
}
