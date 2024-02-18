import { CityEntity, StateEntity } from '@app/database';
import { Public } from '@app/decorators';
import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CitiesService } from './cities.service';
import { StatesService } from './states.service';

@ApiTags('csc')
@Controller('csc/states')
@Public()
export class StatesController {
    constructor(
        private readonly statesService: StatesService,
        private readonly citiesService: CitiesService,
    ) {}

    @Get(':stateId')
    findOne(@Param('stateId', new ParseIntPipe()) stateId: number): Promise<StateEntity> {
        return this.statesService.findOne(stateId);
    }

    @Get(':stateId/cities')
    findAllCities(@Param('stateId', new ParseIntPipe()) stateId: number): Promise<CityEntity[]> {
        return this.citiesService.findAllByState(stateId);
    }
}
