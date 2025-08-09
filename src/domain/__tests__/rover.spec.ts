import { Rover } from './../rover';
import { Plateau } from './../plateau';
import { InvalidInputError } from '../../common/errors/invalid-input.error';
import { ERROR_MESSAGES } from '../../common/errors/messages';

describe('Rover (domain)', () => {
  it('should turn left and right correctly', () => {
    const r = new Rover(0, 0, 'N');
    r.turnLeft();
    expect(r.dir).toBe('W');
    r.turnLeft();
    expect(r.dir).toBe('S');
    r.turnRight();
    expect(r.dir).toBe('W');
    r.turnRight();
    expect(r.dir).toBe('N');
  });

  it('should move within plateau', () => {
    const p = new Plateau(2, 2);
    const r = new Rover(1, 1, 'N');
    r.move(p);
    expect(r.x).toBe(1);
    expect(r.y).toBe(2);
  });

  it('should throw when move would leave plateau', () => {
    const p = new Plateau(0, 0);
    const r = new Rover(0, 0, 'N');
    expect(() => r.move(p)).toThrow(InvalidInputError);
    expect(() => r.move(p)).toThrow(
      ERROR_MESSAGES.movementWouldLeavePlateau(0, 1),
    );
  });
});
