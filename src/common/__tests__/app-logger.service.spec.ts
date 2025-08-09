import { AppLogger } from '../logging/app-logger.service';

describe('AppLogger', () => {
  let logger: AppLogger;
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    logger = new AppLogger();
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('prints structured logs with default context', () => {
    logger.log('hello');
    expect(consoleSpy).toHaveBeenCalledTimes(1);
    const payload = JSON.parse((consoleSpy.mock.calls[0]?.[0] as string) ?? '{}');
    expect(payload.level).toBe('log');
    expect(payload.message).toBe('hello');
    expect(typeof payload.timestamp).toBe('string');
  });

  it('respects explicit context and error stack', () => {
    logger.setContext('Svc');
    logger.error('oops', 'STACK', 'OverrideCtx');
    const payload = JSON.parse((consoleSpy.mock.calls[0]?.[0] as string) ?? '{}');
    expect(payload.level).toBe('error');
    expect(payload.context).toBe('OverrideCtx');
    expect(payload.stack).toBe('STACK');
  });

  it('serializes non-string messages', () => {
    logger.warn({ a: 1 });
    const payload = JSON.parse((consoleSpy.mock.calls[0]?.[0] as string) ?? '{}');
    expect(payload.message).toBe(JSON.stringify({ a: 1 }));
  });
});

