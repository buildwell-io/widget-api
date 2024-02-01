import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function buildSwagger(app: INestApplication): void {
  const options = new DocumentBuilder().setTitle('buildwell.io').addServer('https://buildwell.io').build();

  const document = SwaggerModule.createDocument(app, options, {
    extraModels: []
  });

  SwaggerModule.setup('api/docs', app, document);
}
