import { CountryEntity } from '@app/database';
import { Transform } from 'class-transformer';
import { IsIn, IsOptional } from 'class-validator';
import { FindOptionsSelect } from 'typeorm';

export class CountriesQueryParamsDTO {
    @IsOptional()
    @IsIn([
        'id',
        'name',
        'iso3',
        'numericCode',
        'iso2',
        'phoneCode',
        'capital',
        'currency',
        'currencyName',
        'currencySymbol',
        'tld',
        'native',
        'regionName',
        'regionId',
        'subregionName',
        'subregionId',
        'nationality',
        'timezones',
        'translations',
        'latitude',
        'longitude',
        'emoji',
        'emojiu',
        'wikiDataId',
    ], { each: true })
    @Transform(({ value }) => value.split(',').filter(Boolean))
    fields: FindOptionsSelect<CountryEntity>;
}
