import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppLogger } from './common/logging/app-logger.service';
import { LoggingInterceptor } from './common/logging/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = app.get(AppLogger);
  app.useGlobalInterceptors(new LoggingInterceptor(logger));
  app.useLogger(logger);
  await app.listen(3002);
}
bootstrap();
