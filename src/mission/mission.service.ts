import { Injectable } from '@nestjs/common';
import { ProcessMissionUseCase } from '../usecases/process-mission.usecase';

@Injectable()
export class MissionService {
  constructor(private readonly usecase: ProcessMissionUseCase) {}

  runFromText(text: string): string {
    return this.usecase.run(text);
  }
}
