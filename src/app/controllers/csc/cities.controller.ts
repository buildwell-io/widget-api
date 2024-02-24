import { CityEntity } from '@app/database';
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

import { CitiesService } from './cities.service';
import { CitiesQueryParamsDTO, UpdateCitiesDTO } from './dto';

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
    @ApiQuery({ name: 'fields', type: 'string[]', required: false, example: 'id,name' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: CityEntity })
    findOne(
        @Param('cityId', new ParseIntPipe()) cityId: number,
        @Query(new ValidationPipe({ transform: true })) queryParams: CitiesQueryParamsDTO,
    ): Promise<CityEntity> {
        return this.citiesService.findOne(cityId, queryParams.fields);
    }

    @Patch(':cityId')
    @Version('1')
    @AccountType(AccountTypeEnum.Admin)
    @ApiOperation({ summary: 'Update a city' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: CityEntity })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid payload' })
    updateOne(
        @Param('cityId', new ParseIntPipe()) cityId: number,
        @Body() payload: UpdateCitiesDTO,
    ): Promise<CityEntity> {
        return this.citiesService.updateOne(cityId, payload);
    }
}
