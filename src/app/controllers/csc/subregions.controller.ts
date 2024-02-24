import { CountryEntity, SubregionEntity } from '@app/database';
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

import { CountriesQueryParamsDTO, SubregionsQueryParamsDTO, UpdateSubregionDTO } from './dto';
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
    @ApiQuery({ name: 'fields', type: 'string[]', required: false, example: 'id,name' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: [ SubregionEntity ] })
    findAll(
        @Query(new ValidationPipe({ transform: true })) queryParams: SubregionsQueryParamsDTO,
    ): Promise<SubregionEntity[]> {
        return this.subregionsService.findAll(queryParams.fields);
    }

    @Get(':subregionId')
    @Version('1')
    @ApiOperation({ summary: 'Get a single subregion' })
    @ApiQuery({ name: 'fields', type: 'string[]', required: false, example: 'id,name' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: SubregionEntity })
    findOne(
        @Param('subregionId', new ParseIntPipe()) subregionId: number,
        @Query(new ValidationPipe({ transform: true })) queryParams: SubregionsQueryParamsDTO,
    ): Promise<SubregionEntity> {
        return this.subregionsService.findOne(subregionId, queryParams.fields);
    }

    @Patch(':subregionId')
    @Version('1')
    @AccountType(AccountTypeEnum.Admin)
    @ApiOperation({ summary: 'Update a subregion' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: SubregionEntity })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid payload' })
    updateOne(
        @Param('subregionId', new ParseIntPipe()) subregionId: number,
        @Body() payload: UpdateSubregionDTO,
    ): Promise<SubregionEntity> {
        return this.subregionsService.updateOne(subregionId, payload);
    }

    @Get(':subregionId/countries')
    @Version('1')
    @ApiOperation({ summary: 'Get all single subregion countries' })
    @ApiQuery({ name: 'fields', type: 'string[]', required: false, example: 'id,name' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: [ CountryEntity ] })
    findAllCountries(
        @Param('subregionId', new ParseIntPipe()) subregionId: number,
        @Query(new ValidationPipe({ transform: true })) queryParams: CountriesQueryParamsDTO,
    ): Promise<CountryEntity[]> {
        return this.subregionsService.findAllCountries(subregionId, queryParams.fields);
    }
}
