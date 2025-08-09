import { ProcessMissionUseCase } from '../process-mission.usecase';

describe('ProcessMissionUseCase', () => {
  it('should solve the sample from the statement', () => {
    const input = `5 5
1 2 N
LMLMLMLMM
3 3 E
MMRMMRMRRM`;

    const uc = new ProcessMissionUseCase();
    const output = uc.run(input);

    expect(output.trim()).toBe('1 3 N\n5 1 E');
  });

  it('should fail when trying to leave the plateau', () => {
    const input = `1 1
0 0 S
M`;
    const uc = new ProcessMissionUseCase();
    expect(() => uc.run(input)).toThrow();
  });
});
