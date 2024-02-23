import { StateEntity } from '@app/database';
import { Transform } from 'class-transformer';
import { IsIn, IsOptional } from 'class-validator';
import { FindOptionsSelect } from 'typeorm';

export class StatesQueryParamsDTO {
    @IsOptional()
    @IsIn([
        'id',
        'name',
        'countryId',
        'countryCode',
        'fipsCode',
        'iso2',
        'type',
        'latitude',
        'longitude',
        'wikiDataId',
    ], { each: true })
    @Transform(({ value }) => value.split(',').filter(Boolean))
    fields: FindOptionsSelect<StateEntity>;
}
