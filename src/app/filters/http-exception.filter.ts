import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest();
        const response = ctx.getResponse();
        const statusCode = exception.getStatus();

        response.status(statusCode).json({
            timestamp: new Date().toISOString(),
            path: request.url,
            method: request.method,
            message: exception.message,
            details: null,
        });
    }
}
