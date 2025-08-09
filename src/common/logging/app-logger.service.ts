import { Injectable, LoggerService } from '@nestjs/common';

type LogLevel = 'log' | 'error' | 'warn' | 'debug' | 'verbose';

interface LogRecord {
  level: LogLevel;
  timestamp: string;
  context?: string;
  message: string;
  stack?: string;
  meta?: Record<string, unknown>;
}

@Injectable()
export class AppLogger implements LoggerService {
  private context?: string;

  setContext(context?: string) {
    this.context = context;
  }

  log(message: any, context?: string) {
    this.print('log', message, undefined, context);
  }

  error(message: any, trace?: string, context?: string) {
    this.print('error', message, trace, context);
  }

  warn(message: any, context?: string) {
    this.print('warn', message, undefined, context);
  }

  debug(message: any, context?: string) {
    this.print('debug', message, undefined, context);
  }

  verbose(message: any, context?: string) {
    this.print('verbose', message, undefined, context);
  }

  private print(level: LogLevel, message: any, trace?: string, explicitContext?: string, meta?: Record<string, unknown>) {
    const record: LogRecord = {
      level,
      timestamp: new Date().toISOString(),
      context: explicitContext ?? this.context,
      message: typeof message === 'string' ? message : JSON.stringify(message),
      stack: trace,
      meta,
    };
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(record));
  }
}

