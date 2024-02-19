import { CityEntity } from '@app/database';
import { Controller, Get, HttpStatus, Param, ParseIntPipe, Version } from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';

import { CitiesService } from './cities.service';

@ApiTags('csc')
@Controller('csc/cities')
@Throttle({ default: { limit: 16, ttl: 60_000 } })
@ApiBearerAuth()
@ApiHeader({ name: 'Authorization', required: true, description: 'Bearer <access_token>' })
@ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
@ApiResponse({ status: HttpStatus.TOO_MANY_REQUESTS, description: 'Too many requests (16/min)' })
export class CitiesController {
    constructor(private readonly citiesService: CitiesService) {}

    @Get(':cityId')
    @Version('1')
    @ApiOperation({ summary: 'Get a single city' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: CityEntity })
    findOne(@Param('cityId', new ParseIntPipe()) cityId: number): Promise<CityEntity> {
        return this.citiesService.findOne(cityId);
    }
}
