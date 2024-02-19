import { CityEntity } from '@app/database';
import { Transform } from 'class-transformer';
import { IsIn, IsOptional } from 'class-validator';
import { FindOptionsSelect } from 'typeorm';

export class CitiesQueryParamsDTO {
    @IsOptional()
    @IsIn([
        'id',
        'name',
        'stateId',
        'stateCode',
        'countryId',
        'countryCode',
        'latitude',
        'longitude',
        'wikiDataId',
    ], { each: true })
    @Transform(({ value }) => value.split(',').filter(Boolean))
    fields: FindOptionsSelect<CityEntity>;
}
