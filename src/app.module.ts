import { Module } from '@nestjs/common';
import { AppLogger } from './common/logging/app-logger.service';

@Module({
  imports: [],
  controllers: [],
  providers: [AppLogger],
})
export class AppModule {}
