import { Plateau } from '../domain/plateau';
import { Rover } from '../domain/rover';
import { Direction, parseDirection } from '../domain/direction';
import { InvalidInputError } from '../common/errors/invalid-input.error';
import { ERROR_MESSAGES } from '../common/errors/messages';
import { Command, parseCommandChar } from '../domain/command';

export interface ParsedMission {
  plateau: Plateau;
  rovers: Array<{ rover: Rover; commands: Command[] }>;
}

export function parseMissionInput(input: string): ParsedMission {
  const lines = input
    .split(/\r?\n/)
    .map(l => l.trim())
    .filter(Boolean);

  if (lines.length < 3) {
    throw new InvalidInputError(ERROR_MESSAGES.inputTooShort);
  }

  const [plateauLine, ...rest] = lines;
  const plateauParts = plateauLine.split(/\s+/);
  if (plateauParts.length !== 2) throw new InvalidInputError(ERROR_MESSAGES.plateauLineInvalid);

  const maxX = Number(plateauParts[0]);
  const maxY = Number(plateauParts[1]);
  if (Number.isNaN(maxX) || Number.isNaN(maxY)) throw new InvalidInputError(ERROR_MESSAGES.plateauCoordsInvalid);

  const plateau = new Plateau(maxX, maxY);

  const rovers: Array<{ rover: Rover; commands: Command[] }> = [];

  for (let i = 0; i < rest.length; i += 2) {
    const posLine = rest[i];
    const commandsLine = rest[i + 1];
    if (!posLine) throw new InvalidInputError(ERROR_MESSAGES.entryTruncated);

    const parts = posLine.split(/\s+/);
    if (parts.length !== 3) throw new InvalidInputError(ERROR_MESSAGES.roverPositionInvalid(posLine));

    const x = Number(parts[0]);
    const y = Number(parts[1]);
    if (Number.isNaN(x) || Number.isNaN(y)) throw new InvalidInputError(ERROR_MESSAGES.roverCoordsInvalid);

    const dir: Direction = parseDirection(parts[2]);
    const rover = new Rover(x, y, dir);
    if (!plateau.isInside(rover.x, rover.y)) {
      throw new InvalidInputError(ERROR_MESSAGES.roverInitOutside(rover.x, rover.y));
    }

    if (!commandsLine) throw new InvalidInputError(ERROR_MESSAGES.missingCommands);
    const commands = [...commandsLine.trim()].map(parseCommandChar);
    rovers.push({ rover, commands });
  }

  return { plateau, rovers };
}

