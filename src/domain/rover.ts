import { InvalidInputError } from '../common/errors/invalid-input.error';
import { Direction, rotateLeft, rotateRight } from './direction';
import { Plateau } from './plateau';
import { ERROR_MESSAGES } from '../common/errors/messages';

export class Rover {
  constructor(
    public x: number,
    public y: number,
    public dir: Direction,
  ) {}

  turnLeft(): void {
    this.dir = rotateLeft(this.dir);
  }

  turnRight(): void {
    this.dir = rotateRight(this.dir);
  }

  move(plateau: Plateau): void {
    let nx = this.x;
    let ny = this.y;
    switch (this.dir) {
      case 'N':
        ny += 1;
        break;
      case 'S':
        ny -= 1;
        break;
      case 'E':
        nx += 1;
        break;
      case 'W':
        nx -= 1;
        break;
    }

    if (!plateau.isInside(nx, ny)) {
      throw new InvalidInputError(
        ERROR_MESSAGES.movementWouldLeavePlateau(nx, ny),
      );
    }

    this.x = nx;
    this.y = ny;
  }

  toString(): string {
    return `${this.x} ${this.y} ${this.dir}`;
  }
}
