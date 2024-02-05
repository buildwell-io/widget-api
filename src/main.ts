import { buildSwagger } from '@core/swagger';
import { Logger, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // app.enableCors(); // TODO: Need investigation
    app.setGlobalPrefix('/');
    app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });

    buildSwagger(app);

    const port = process.env.PORT || 3000;
    app.listen(port).then(() => {
        Logger.log(`🚀 Application is running on: http://localhost:${port}`);
    });
}

bootstrap();
