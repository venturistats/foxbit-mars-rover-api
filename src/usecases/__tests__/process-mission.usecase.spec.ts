import { ProcessMissionUseCase } from '../process-mission.usecase';
import { InvalidInputError } from '../../common/errors/invalid-input.error';

describe('ProcessMissionUseCase', () => {
  it('returns joined rover outputs line by line', () => {
    const input = `5 5\n1 2 N\nLMLMLMLMM\n3 3 E\nMMRMMRMRRM`;
    const uc = new ProcessMissionUseCase();
    const output = uc.run(input);
    expect(output).toBe('1 3 N\n5 1 E');
  });

  it('throws InvalidInputError when parsing fails', () => {
    const badInput = `5 A\n0 0 N\nM`;
    const uc = new ProcessMissionUseCase();
    expect(() => uc.run(badInput)).toThrow(InvalidInputError);
  });

  it('propagates movement errors from execution', () => {
    const input = `1 1\n0 0 S\nM`; // moving south leaves plateau
    const uc = new ProcessMissionUseCase();
    expect(() => uc.run(input)).toThrow(InvalidInputError);
  });
});
