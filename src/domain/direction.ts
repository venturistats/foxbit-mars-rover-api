import { InvalidInputError } from "../common/errors/invalid-input.error";
import { ERROR_MESSAGES } from "../common/errors/messages";

export type Direction = 'N' | 'E' | 'S' | 'W';

export const directions: Direction[] = ['N', 'E', 'S', 'W'];

export function rotateLeft(d: Direction): Direction {
  const idx = directions.indexOf(d);
  return directions[(idx + 3) % 4];
}

export function rotateRight(d: Direction): Direction {
  const idx = directions.indexOf(d);
  return directions[(idx + 1) % 4];
}

export function parseDirection(value: string): Direction {
  const upper = value?.toUpperCase();
  if (directions.includes(upper as Direction)) {
    return upper as Direction;
  }
  throw new InvalidInputError(ERROR_MESSAGES.invalidDirection(value));
}