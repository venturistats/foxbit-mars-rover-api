import { InvalidInputError } from '../common/errors/invalid-input.error';
import { ERROR_MESSAGES } from '../common/errors/messages';

export class Plateau {
  constructor(
    public readonly maxX: number,
    public readonly maxY: number,
  ) {
    if (
      !Number.isFinite(maxX) ||
      !Number.isFinite(maxY) ||
      maxX < 0 ||
      maxY < 0
    ) {
      throw new InvalidInputError(ERROR_MESSAGES.plateauDimsInvalid);
    }
  }

  isInside(x: number, y: number): boolean {
    return x >= 0 && y >= 0 && x <= this.maxX && y <= this.maxY;
  }
}
