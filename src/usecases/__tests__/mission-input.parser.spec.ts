import { parseMissionInput } from '../mission-input.parser';
import { ERROR_MESSAGES } from '../../common/errors/messages';
import { InvalidInputError } from '../../common/errors/invalid-input.error';

describe('parseMissionInput', () => {
  it('parses a valid multi-rover mission', () => {
    const input = `  5   5  \n\n
      1 2 n\n
      LMLMLMLMM\n\n
      3 3 E\n
      MMRMMRMRRM   `;

    const { plateau, rovers } = parseMissionInput(input);

    expect(plateau.maxX).toBe(5);
    expect(plateau.maxY).toBe(5);
    expect(rovers).toHaveLength(2);
    expect(
      `${rovers[0].rover.x} ${rovers[0].rover.y} ${rovers[0].rover.dir}`,
    ).toBe('1 2 N');
    expect(rovers[0].commands.length).toBeGreaterThan(0);
    expect(
      `${rovers[1].rover.x} ${rovers[1].rover.y} ${rovers[1].rover.dir}`,
    ).toBe('3 3 E');
  });

  it('throws when input has fewer than 3 non-empty lines', () => {
    const input = `5 5\n`;
    expect(() => parseMissionInput(input)).toThrow(
      new InvalidInputError(ERROR_MESSAGES.inputTooShort),
    );
  });

  it('throws when plateau line has invalid number of parts', () => {
    const input = `5 5 5\n0 0 N\nM`;
    expect(() => parseMissionInput(input)).toThrow(
      new InvalidInputError(ERROR_MESSAGES.plateauLineInvalid),
    );
  });

  it('throws when plateau coords are not numbers', () => {
    const input = `A 5\n0 0 N\nM`;
    expect(() => parseMissionInput(input)).toThrow(
      new InvalidInputError(ERROR_MESSAGES.plateauCoordsInvalid),
    );
  });

  it('throws when plateau dimensions are invalid (negative)', () => {
    const input = `-1 5\n0 0 N\nM`;
    expect(() => parseMissionInput(input)).toThrow(InvalidInputError);
  });

  it('throws when rover position line is not 3 parts', () => {
    const input = `5 5\n0 0\nM`;
    expect(() => parseMissionInput(input)).toThrow(InvalidInputError);
  });

  it('throws when rover coordinates are not numbers', () => {
    const input = `5 5\nA 0 N\nM`;
    expect(() => parseMissionInput(input)).toThrow(
      new InvalidInputError(ERROR_MESSAGES.roverCoordsInvalid),
    );
  });

  it('throws when rover direction is invalid', () => {
    const input = `5 5\n0 0 X\nM`;
    expect(() => parseMissionInput(input)).toThrow(InvalidInputError);
  });

  it('throws when rover initial position is outside plateau', () => {
    const input = `1 1\n2 2 N\nM`;
    expect(() => parseMissionInput(input)).toThrow(InvalidInputError);
  });

  it('throws when commands line is missing for a rover', () => {
    // Second rover without a commands line
    const input = `5 5\n0 0 N\nM\n1 1 N\n`;
    expect(() => parseMissionInput(input)).toThrow(
      new InvalidInputError(ERROR_MESSAGES.missingCommands),
    );
  });

  it('throws when commands contain an invalid character', () => {
    const input = `5 5\n0 0 N\nMX`;
    expect(() => parseMissionInput(input)).toThrow(InvalidInputError);
  });
});
