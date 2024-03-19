import { APP_VERSION, APP_VERSION_AT } from '@app/constants';
import { StripeAddress } from '@app/controllers';
import {
    AccountEntity,
    CityEntity,
    ConfirmationEntity,
    CountryEntity,
    RegionEntity,
    StateEntity,
    SubregionEntity,
    WidgetEntity,
} from '@app/database';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { HttpErrorResponseEntity } from './entities';

export function buildSwagger(app: INestApplication): void {
    const options = new DocumentBuilder()
        .setVersion(APP_VERSION)
        .setDescription(`Version at: ${APP_VERSION_AT} (UTC)`)
        .setTitle('buildwell.io')
        .addServer('https://api.buildwell.io', 'Production API')
        .addServer('https://api-dev.buildwell.io', 'Development API')
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, options, {
        extraModels: [
            HttpErrorResponseEntity,
            RegionEntity,
            SubregionEntity,
            CountryEntity,
            StateEntity,
            CityEntity,
            AccountEntity,
            ConfirmationEntity,
            WidgetEntity,
            StripeAddress,
        ],
    });

    SwaggerModule.setup('docs', app, document);
}
