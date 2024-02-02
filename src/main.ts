/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { ClassSerializerInterceptor, Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { buildSwagger } from '@core/build-swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.use((req, res, next) => {
        res.removeHeader('X-Powered-By');
        next();
    });

    app.enableCors();
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe({ disableErrorMessages: true }));
    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
    app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });

    buildSwagger(app);

    const port = process.env.PORT || 3000;
    app.listen(port).then(() => {
        Logger.log(`🚀 Application is running on: http://localhost:${port}`);
    });
}

bootstrap();
