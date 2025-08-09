import { of, throwError } from 'rxjs';
import { LoggingInterceptor } from '../logging/logging.interceptor';
import { AppLogger } from '../logging/app-logger.service';

describe('LoggingInterceptor', () => {
  const makeContext = (method = 'GET', url = '/test') =>
    ({
      switchToHttp: () => ({
        getRequest: () => ({ method, url }),
      }),
    }) as any;

  const makeNext = (obsFactory: () => any) =>
    ({
      handle: () => obsFactory(),
    }) as any;

  let logger: AppLogger;
  let logSpy: jest.SpyInstance;
  let errorSpy: jest.SpyInstance;

  beforeEach(() => {
    logger = new AppLogger();
    logSpy = jest.spyOn(logger, 'log').mockImplementation(() => {});
    errorSpy = jest.spyOn(logger, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('logs incoming and completion when next succeeds', (done) => {
    const interceptor = new LoggingInterceptor(logger);
    const context = makeContext('POST', '/ok');
    const next = makeNext(() => of('ok'));

    interceptor.intercept(context as any, next as any).subscribe({
      next: () => {
        expect(logSpy).toHaveBeenCalledWith('incoming_request POST /ok');
        // second log is request_complete ...ms
        expect(logSpy).toHaveBeenCalledTimes(2);
        done();
      },
      error: (err) => done(err),
    });
  });

  it('logs incoming and error when next errors', (done) => {
    const interceptor = new LoggingInterceptor(logger);
    const context = makeContext('GET', '/fail');
    const next = makeNext(() => throwError(() => new Error('boom')));

    interceptor.intercept(context as any, next as any).subscribe({
      next: () => done(new Error('should not succeed')),
      error: () => {
        expect(logSpy).toHaveBeenCalledWith('incoming_request GET /fail');
        expect(errorSpy).toHaveBeenCalled();
        done();
      },
    });
  });
});
