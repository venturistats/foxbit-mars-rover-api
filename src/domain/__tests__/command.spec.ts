import { Command, parseCommandChar } from './../command';
import { InvalidInputError } from '../../common/errors/invalid-input.error';
import { ERROR_MESSAGES } from '../../common/errors/messages';

describe('Command (domain)', () => {
  it('should parse valid characters to enum (case-insensitive)', () => {
    expect(parseCommandChar('L')).toBe(Command.Left);
    expect(parseCommandChar('R')).toBe(Command.Right);
    expect(parseCommandChar('M')).toBe(Command.Move);

    expect(parseCommandChar('l')).toBe(Command.Left);
    expect(parseCommandChar('r')).toBe(Command.Right);
    expect(parseCommandChar('m')).toBe(Command.Move);
  });

  it('should throw InvalidInputError for invalid characters', () => {
    expect(() => parseCommandChar('X')).toThrow(InvalidInputError);
    expect(() => parseCommandChar('X')).toThrow(
      ERROR_MESSAGES.invalidCommand('X'),
    );

    expect(() => parseCommandChar('')).toThrow(InvalidInputError);
    expect(() => parseCommandChar('')).toThrow(
      ERROR_MESSAGES.invalidCommand(''),
    );
  });
});
