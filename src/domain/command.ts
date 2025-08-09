import { InvalidInputError } from "../common/errors/invalid-input.error";
import { ERROR_MESSAGES } from "../common/errors/messages";

export enum Command {
  Left = 0,
  Right = 1,
  Move = 2,
}

export function parseCommandChar(value: string): Command {
  const upper = value?.toUpperCase();
  if (upper === 'L') return Command.Left;
  if (upper === 'R') return Command.Right;
  if (upper === 'M') return Command.Move;
  throw new InvalidInputError(ERROR_MESSAGES.invalidCommand(value));
}
