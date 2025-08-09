import { Plateau } from './../plateau';
import { InvalidInputError } from '../../common/errors/invalid-input.error';
import { ERROR_MESSAGES } from '../../common/errors/messages';

describe('Plateau (domain)', () => {
  it('should validate inside bounds', () => {
    const p = new Plateau(5, 5);
    expect(p.isInside(0, 0)).toBe(true);
    expect(p.isInside(5, 5)).toBe(true);
    expect(p.isInside(3, 4)).toBe(true);
    expect(p.isInside(-1, 0)).toBe(false);
    expect(p.isInside(0, -1)).toBe(false);
    expect(p.isInside(6, 0)).toBe(false);
    expect(p.isInside(0, 6)).toBe(false);
  });

  it('should throw on invalid dimensions', () => {
    expect(() => new Plateau(-1, 5)).toThrow(InvalidInputError);
    expect(() => new Plateau(-1, 5)).toThrow(ERROR_MESSAGES.plateauDimsInvalid);
    expect(() => new Plateau(1, -5)).toThrow(InvalidInputError);
    expect(() => new Plateau(NaN as any, 1)).toThrow(InvalidInputError);
  });
});
