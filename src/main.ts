import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppLogger } from './common/logging/app-logger.service';
import { LoggingInterceptor } from './common/logging/logging.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { DomainExceptionFilter } from './common/filters/domain-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const logger = app.get(AppLogger);
  app.useLogger(logger);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalFilters(new DomainExceptionFilter(logger));
  app.useGlobalInterceptors(new LoggingInterceptor(logger));

  const config = new DocumentBuilder()
    .setTitle('Foxbit Mission API')
    .setDescription('API to process Mars Rover mission inputs')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  await app.listen(3002);
}
bootstrap();
