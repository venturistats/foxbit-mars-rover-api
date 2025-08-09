import { Test } from '@nestjs/testing';
import { MissionService } from '../mission.service';
import { ProcessMissionUseCase } from '../../usecases/process-mission.usecase';

describe('MissionService', () => {
  it('delegates to ProcessMissionUseCase.run', async () => {
    const runMock = jest.fn().mockReturnValue('OK');
    const moduleRef = await Test.createTestingModule({
      providers: [
        MissionService,
        { provide: ProcessMissionUseCase, useValue: { run: runMock } },
      ],
    }).compile();

    const service = moduleRef.get(MissionService);
    const result = service.runFromText('INPUT');

    expect(runMock).toHaveBeenCalledWith('INPUT');
    expect(result).toBe('OK');
  });
});
