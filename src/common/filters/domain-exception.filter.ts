import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { InvalidInputError } from '../errors/invalid-input.error';
import { AppLogger } from '../logging/app-logger.service';

@Catch()
export class DomainExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: AppLogger) {}
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    if (exception instanceof HttpException) {
      this.logger.warn(
        `http_exception ${request?.method} ${request?.url} ${exception.getStatus()}: ${JSON.stringify(exception.getResponse())}`,
      );
      return response
        .status(exception.getStatus())
        .json(exception.getResponse());
    }

    if (exception instanceof InvalidInputError || exception instanceof Error) {
      const message = exception.message || 'Invalid input';
      const badReq = new BadRequestException(message);
      this.logger.warn(
        `domain_error ${request?.method} ${request?.url} 400: ${message}`,
      );
      return response.status(badReq.getStatus()).json(badReq.getResponse());
    }

    const badReq = new BadRequestException('Unexpected error');
    this.logger.error(
      `unexpected_error ${request?.method} ${request?.url}: Unexpected error`,
    );
    return response.status(badReq.getStatus()).json(badReq.getResponse());
  }
}
