import { CityEntity } from '@app/database';
import { Public } from '@app/decorators';
import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CitiesService } from './cities.service';

@ApiTags('csc')
@Controller('csc/cities')
@Public()
export class CitiesController {
    constructor(private readonly citiesService: CitiesService) {}

    @Get(':cityId')
    findOne(@Param('cityId', new ParseIntPipe()) cityId: number): Promise<CityEntity> {
        return this.citiesService.findOne(cityId);
    }
}
