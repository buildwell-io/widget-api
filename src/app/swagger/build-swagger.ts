import { APP_VERSION, APP_VERSION_AT } from '@app/constants';
import { AccountEntity, ConfirmationEntity, WidgetEntity } from '@app/database';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function buildSwagger(app: INestApplication): void {
    const options = new DocumentBuilder()
        .setVersion(APP_VERSION)
        .setDescription(`Version at: ${APP_VERSION_AT} (UTC)`)
        .setTitle('buildwell.io')
        .addServer('https://buildwell.io')
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, options, {
        extraModels: [ AccountEntity, ConfirmationEntity, WidgetEntity ],
    });

    SwaggerModule.setup('docs', app, document);
}
