import { buildSwagger } from '@app/swagger';
import { HttpStatus, Logger, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors({
        origin: [ 'https://app.buildwell.io', 'https://widget.buildwell.io' ],
        methods: [ 'GET', 'PATCH', 'POST', 'DELETE' ],
        allowedHeaders: [ 'Content-Type', 'Accept', 'Authorization' ],
        credentials: true,
        preflightContinue: false,
        optionsSuccessStatus: HttpStatus.NO_CONTENT,
    });

    app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });

    buildSwagger(app);

    const port = process.env.PORT || 3000;
    app.listen(port).then(() => {
        Logger.log(`🚀 Application is running on: http://localhost:${port}`);
    });
}

bootstrap();
