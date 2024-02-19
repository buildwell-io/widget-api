import { RegionEntity } from '@app/database';
import { Transform } from 'class-transformer';
import { IsIn, IsOptional } from 'class-validator';
import { FindOptionsSelect } from 'typeorm';

export class RegionsQueryParamsDTO {
    @IsOptional()
    @IsIn([
        'id',
        'name',
        'translations',
        'wikiDataId',
    ], { each: true })
    @Transform(({ value }) => value.split(',').filter(Boolean))
    fields: FindOptionsSelect<RegionEntity>;
}
