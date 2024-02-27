import { CityEntity, CountryEntity, RegionEntity, StateEntity, SubregionEntity } from '@app/database';
import { DBConnectionName } from '@app/enums';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CitiesController } from './cities.controller';
import { CitiesService } from './cities.service';
import { CountriesController } from './countries.controller';
import { CountriesService } from './countries.service';
import { RegionsController } from './regions.controller';
import { RegionsService } from './regions.service';
import { StatesController } from './states.controller';
import { StatesService } from './states.service';
import { SubregionsController } from './subregions.controller';
import { SubregionsService } from './subregions.service';

@Module({
    imports: [ TypeOrmModule.forFeature([ RegionEntity, SubregionEntity, CountryEntity, StateEntity, CityEntity ], DBConnectionName.PostgresSQL) ],
    controllers: [ RegionsController, SubregionsController, CountriesController, StatesController, CitiesController ],
    providers: [ RegionsService, SubregionsService, CountriesService, StatesService, CitiesService ],
})
export class CSCModule {}
