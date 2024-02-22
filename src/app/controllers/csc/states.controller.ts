import { CityEntity, StateEntity } from '@app/database';
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
import { StatesQueryParamsDTO, UpdateStateDTO } from './dto';
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
    @ApiQuery({ name: 'fields', type: 'string[]', required: false, example: 'id,name' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: StateEntity })
    findOne(
        @Param('stateId', new ParseIntPipe()) stateId: number,
        @Query(new ValidationPipe({ transform: true })) queryParams: StatesQueryParamsDTO,
    ): Promise<StateEntity> {
        return this.statesService.findOne(stateId, queryParams.fields);
    }

    @Patch(':stateId')
    @Version('1')
    @ApiOperation({ summary: 'Update a state' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: StateEntity })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid payload' })
    updateOne(
        @Param('stateId', new ParseIntPipe()) regionId: number,
        @Body() payload: UpdateStateDTO,
    ): Promise<StateEntity> {
        return this.statesService.updateOne(regionId, payload);
    }

    @Get(':stateId/cities')
    @Version('1')
    @ApiOperation({ summary: 'Get a single state cities' })
    @ApiQuery({ name: 'fields', type: 'string[]', required: false, example: 'id,name' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: [ CityEntity ] })
    findAllCities(
        @Param('stateId', new ParseIntPipe()) stateId: number,
        @Query(new ValidationPipe({ transform: true })) queryParams: StatesQueryParamsDTO,
    ): Promise<CityEntity[]> {
        return this.citiesService.findAllByState(stateId, queryParams.fields);
    }
}
