import { buildSwagger } from '@app/swagger';
import { HttpStatus, Logger, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    const NODE_ENV = configService.get('NODE_ENV');
    const PORT = configService.get('PORT');

    const accessControlAllowOrigin = NODE_ENV === 'production'
        ? [ 'https://app.buildwell.io', 'https://widget.buildwell.io' ]
        : '*';

    app.enableCors({
        origin: accessControlAllowOrigin,
        methods: [ 'GET', 'PATCH', 'POST', 'DELETE' ],
        allowedHeaders: [ 'Content-Type', 'Accept', 'Authorization' ],
        credentials: true,
        preflightContinue: false,
        optionsSuccessStatus: HttpStatus.NO_CONTENT,
    });

    app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });

    buildSwagger(app);

    const port = PORT || 3000;
    app.listen(port).then(() => {
        Logger.log(`🚀 Application is running on: http://localhost:${port}`);
    });
}

bootstrap();
