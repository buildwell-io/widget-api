import { CountryEntity, SubregionEntity } from '@app/database';
import { Public } from '@app/decorators';
import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { SubregionsService } from './subregions.service';

@ApiTags('csc')
@Controller('csc/subregions')
@Public()
export class SubregionsController {
    constructor(private readonly subregionsService: SubregionsService) {}

    @Get()
    findAll(): Promise<SubregionEntity[]> {
        return this.subregionsService.findAll();
    }

    @Get(':subregionId')
    findOne(@Param('subregionId', new ParseIntPipe()) subregionId: number): Promise<SubregionEntity> {
        return this.subregionsService.findOne(subregionId);
    }

    @Get(':subregionId/countries')
    findAllCountries(@Param('subregionId', new ParseIntPipe()) subregionId: number): Promise<CountryEntity[]> {
        return this.subregionsService.findAllCountries(subregionId);
    }
}
