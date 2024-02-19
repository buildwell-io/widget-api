import { CityEntity, StateEntity } from '@app/database';
import { Controller, Get, HttpStatus, Param, ParseIntPipe, Version } from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';

import { CitiesService } from './cities.service';
import { StatesService } from './states.service';

@ApiTags('csc')
@Controller('csc/states')
@Throttle({ default: { limit: 16, ttl: 60_000 } })
@ApiBearerAuth()
@ApiHeader({ name: 'Authorization', required: true, description: 'Bearer <access_token>' })
@ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
@ApiResponse({ status: HttpStatus.TOO_MANY_REQUESTS, description: 'Too many requests (16/min)' })
export class StatesController {
    constructor(
        private readonly statesService: StatesService,
        private readonly citiesService: CitiesService,
    ) {}

    @Get(':stateId')
    @Version('1')
    @ApiOperation({ summary: 'Get a single state' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: StateEntity })
    findOne(@Param('stateId', new ParseIntPipe()) stateId: number): Promise<StateEntity> {
        return this.statesService.findOne(stateId);
    }

    @Get(':stateId/cities')
    @Version('1')
    @ApiOperation({ summary: 'Get a single state cities' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: [ CityEntity ] })
    findAllCities(@Param('stateId', new ParseIntPipe()) stateId: number): Promise<CityEntity[]> {
        return this.citiesService.findAllByState(stateId);
    }
}
