import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AccountEntity } from '@core/database/entities/account.entity';

export function buildSwagger(app: INestApplication): void {
    const options = new DocumentBuilder()
        .setTitle('buildwell.io')
        .addServer('https://buildwell.io')
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, options, {
        extraModels: [ AccountEntity ],
    });

    SwaggerModule.setup('api/docs', app, document);
}
