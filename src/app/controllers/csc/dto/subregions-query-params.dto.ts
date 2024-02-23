import { SubregionEntity } from '@app/database';
import { Transform } from 'class-transformer';
import { IsIn, IsOptional } from 'class-validator';
import { FindOptionsSelect } from 'typeorm';

export class SubregionsQueryParamsDTO {
    @IsOptional()
    @IsIn([
        'id',
        'name',
        'translations',
        'regionId',
        'wikiDataId',
    ], { each: true })
    @Transform(({ value }) => value.split(',').filter(Boolean))
    fields: FindOptionsSelect<SubregionEntity>;
}
