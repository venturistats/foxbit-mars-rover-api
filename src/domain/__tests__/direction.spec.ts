import { Direction, rotateLeft, rotateRight, parseDirection } from './../direction';
import { InvalidInputError } from '../../common/errors/invalid-input.error';
import { ERROR_MESSAGES } from '../../common/errors/messages';

describe('Direction (domain)', () => {
  it('should rotate left in correct order', () => {
    expect(rotateLeft('N')).toBe('W');
    expect(rotateLeft('W')).toBe('S');
    expect(rotateLeft('S')).toBe('E');
    expect(rotateLeft('E')).toBe('N');
  });

  it('should rotate right in correct order', () => {
    expect(rotateRight('N')).toBe('E');
    expect(rotateRight('E')).toBe('S');
    expect(rotateRight('S')).toBe('W');
    expect(rotateRight('W')).toBe('N');
  });

  it('should parse valid directions (case-insensitive)', () => {
    expect(parseDirection('n')).toBe<Direction>('N');
    expect(parseDirection('e')).toBe<Direction>('E');
    expect(parseDirection('s')).toBe<Direction>('S');
    expect(parseDirection('w')).toBe<Direction>('W');
  });

  it('should throw on invalid direction', () => {
    expect(() => parseDirection('X')).toThrow(InvalidInputError);
    expect(() => parseDirection('X')).toThrow(ERROR_MESSAGES.invalidDirection('X'));
  });
});

