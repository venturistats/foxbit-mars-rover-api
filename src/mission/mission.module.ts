import { Module } from '@nestjs/common';
import { MissionService } from './mission.service';
import { MissionController } from './mission.controller';
import { ProcessMissionUseCase } from '../usecases/process-mission.usecase';

@Module({
  controllers: [MissionController],
  providers: [MissionService, ProcessMissionUseCase],
  exports: [MissionService],
})
export class MissionModule {}
