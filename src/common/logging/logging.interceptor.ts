import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AppLogger } from './app-logger.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: AppLogger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const method: string | undefined = req?.method;
    const url: string | undefined = req?.url;
    const start = Date.now();
    this.logger.log(`incoming_request ${method} ${url}`);
    return next.handle().pipe(
      tap({
        next: () => {
          const ms = Date.now() - start;
          this.logger.log(`request_complete ${method} ${url} ${ms}ms`);
        },
        error: (err: unknown) => {
          const ms = Date.now() - start;
          this.logger.error(`request_error ${method} ${url} ${ms}ms`, err instanceof Error ? err.stack : undefined);
        },
      }),
    );
  }
}

