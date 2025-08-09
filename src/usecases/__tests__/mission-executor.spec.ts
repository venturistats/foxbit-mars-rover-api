import { executeMission } from '../mission-executor';
import { Plateau } from '../../domain/plateau';
import { Rover } from '../../domain/rover';
import { Direction } from '../../domain/direction';
import { Command } from '../../domain/command';
import { InvalidInputError } from '../../common/errors/invalid-input.error';

describe('executeMission', () => {
  it('executes rotations and movements in order', () => {
    const plateau = new Plateau(5, 5);
    const rover = new Rover(1, 2, 'N' as Direction);
    const commands: Command[] = [
      Command.Left,
      Command.Move,
      Command.Left,
      Command.Move,
      Command.Left,
      Command.Move,
      Command.Left,
      Command.Move,
      Command.Move,
    ];

    executeMission(plateau, rover, commands);

    expect(rover.toString()).toBe('1 3 N');
  });

  it('throws InvalidInputError when encountering an invalid command', () => {
    const plateau = new Plateau(5, 5);
    const rover = new Rover(0, 0, 'N' as Direction);
    const invalid = 999 as unknown as Command;
    const commands: Command[] = [Command.Move, invalid];

    expect(() => executeMission(plateau, rover, commands)).toThrow(InvalidInputError);
  });

  it('throws when a move would leave the plateau', () => {
    const plateau = new Plateau(1, 1);
    const rover = new Rover(0, 0, 'S' as Direction);
    const commands: Command[] = [Command.Move];

    expect(() => executeMission(plateau, rover, commands)).toThrow(InvalidInputError);
  });

  it('does nothing when command list is empty', () => {
    const plateau = new Plateau(3, 3);
    const rover = new Rover(2, 2, 'E' as Direction);
    const commands: Command[] = [];

    executeMission(plateau, rover, commands);

    expect(rover.toString()).toBe('2 2 E');
  });
});

