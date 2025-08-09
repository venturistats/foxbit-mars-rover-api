import { ArgumentsHost, BadRequestException } from '@nestjs/common';
import { DomainExceptionFilter } from '../filters/domain-exception.filter';
import { AppLogger } from '../logging/app-logger.service';
import { InvalidInputError } from '../errors/invalid-input.error';

function makeHost(method = 'GET', url = '/test') {
  const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  const req: any = { method, url };
  return {
    switchToHttp: () => ({ getResponse: () => res, getRequest: () => req }),
  } as unknown as ArgumentsHost;
}

describe('DomainExceptionFilter', () => {
  let logger: AppLogger;
  let warnSpy: jest.SpyInstance;
  let errorSpy: jest.SpyInstance;

  beforeEach(() => {
    logger = new AppLogger();
    warnSpy = jest.spyOn(logger, 'warn').mockImplementation(() => {});
    errorSpy = jest.spyOn(logger, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('passes through HttpException response and logs warning', () => {
    const filter = new DomainExceptionFilter(logger);
    const host = makeHost('POST', '/resource');
    const exception = new BadRequestException({ foo: 'bar' });
    filter.catch(exception, host);
    const res = (host.switchToHttp() as any).getResponse();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(exception.getResponse());
    expect(warnSpy).toHaveBeenCalled();
  });

  it('wraps InvalidInputError into BadRequest and logs warning', () => {
    const filter = new DomainExceptionFilter(logger);
    const host = makeHost('GET', '/domain');
    const exception = new InvalidInputError('invalid');
    filter.catch(exception, host);
    const res = (host.switchToHttp() as any).getResponse();
    const badReq = new BadRequestException('invalid');
    expect(res.status).toHaveBeenCalledWith(badReq.getStatus());
    expect(res.json).toHaveBeenCalledWith(badReq.getResponse());
    expect(warnSpy).toHaveBeenCalled();
  });

  it('wraps generic Error into BadRequest and logs warning', () => {
    const filter = new DomainExceptionFilter(logger);
    const host = makeHost('GET', '/err');
    const exception = new Error('something');
    filter.catch(exception, host);
    const res = (host.switchToHttp() as any).getResponse();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalled();
    expect(warnSpy).toHaveBeenCalled();
  });

  it('handles unknown non-error values as unexpected error and logs error', () => {
    const filter = new DomainExceptionFilter(logger);
    const host = makeHost('GET', '/unknown');
    filter.catch('weird' as any, host);
    const res = (host.switchToHttp() as any).getResponse();
    expect(res.status).toHaveBeenCalledWith(400);
    const payload = new BadRequestException('Unexpected error').getResponse();
    expect(res.json).toHaveBeenCalledWith(payload);
    expect(errorSpy).toHaveBeenCalled();
  });
});
