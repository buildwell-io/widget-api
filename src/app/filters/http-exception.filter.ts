import { HttpErrorResponse } from '@app/interfaces';
import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { Stripe } from 'stripe';

@Catch(HttpException, Stripe.errors.StripeError)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException | Stripe.errors.StripeError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        if (exception instanceof HttpException) this.fromHttpError(response, exception);
        else if (exception instanceof Stripe.errors.StripeError) this.fromStripeError(response, exception);
    }

    private fromHttpError(response: Response, exception: HttpException): void {
        const status = exception.getStatus();
        response.status(status).json({
            error: exception.message,
            status,
        } satisfies HttpErrorResponse);
    }

    private fromStripeError(response: Response, exception: Stripe.errors.StripeError): void {
        const status = exception.statusCode;
        response.status(status).json({
            error: exception.message,
            status,
        } satisfies HttpErrorResponse);
    }
}
