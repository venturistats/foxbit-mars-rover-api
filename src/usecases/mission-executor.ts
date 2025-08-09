import { Plateau } from '../domain/plateau';
import { Rover } from '../domain/rover';
import { InvalidInputError } from '../common/errors/invalid-input.error';
import { ERROR_MESSAGES } from '../common/errors/messages';
import { Command } from '../domain/command';

export function executeMission(plateau: Plateau, rover: Rover, commands: Command[]): void {
  for (const ch of commands) {
    if (ch === Command.Left) rover.turnLeft();
    else if (ch === Command.Right) rover.turnRight();
    else if (ch === Command.Move) rover.move(plateau);
    else throw new InvalidInputError(ERROR_MESSAGES.invalidCommand(String(ch)));
  }
}

