import { Module } from '@nestjs/common';
import { AppLogger } from './common/logging/app-logger.service';
import { MissionModule } from './mission/mission.module';

@Module({
  imports: [MissionModule],
  controllers: [],
  providers: [AppLogger],
})
export class AppModule {}
