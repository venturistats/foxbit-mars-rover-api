import { ERROR_MESSAGES } from '../errors/messages';

describe('ERROR_MESSAGES', () => {
  it('contains the expected static messages', () => {
    expect(ERROR_MESSAGES.inputTooShort).toBe('Entrada inválida: muito curta');
    expect(ERROR_MESSAGES.plateauLineInvalid).toBe('Linha do plateau inválida');
    expect(ERROR_MESSAGES.plateauCoordsInvalid).toBe(
      'Coordenadas do plateau inválidas',
    );
    expect(ERROR_MESSAGES.roverCoordsInvalid).toBe(
      'Coordenadas do rover inválidas',
    );
    expect(ERROR_MESSAGES.missingCommands).toBe(
      'Faltam comandos para um rover',
    );
    expect(ERROR_MESSAGES.plateauDimsInvalid).toBe(
      'Dimensões do plateau inválidas',
    );
  });

  it('generates dynamic messages', () => {
    expect(ERROR_MESSAGES.roverPositionInvalid('abc')).toBe(
      'Posição do rover inválida: "abc"',
    );
    expect(ERROR_MESSAGES.invalidCommand('X')).toBe('Comando inválido: X');
    expect(ERROR_MESSAGES.invalidDirection('Y')).toBe('Direção inválida: Y');
    expect(ERROR_MESSAGES.roverInitOutside(2, 3)).toBe(
      'Rover inicial fora dos limites: 2 3',
    );
    expect(ERROR_MESSAGES.movementWouldLeavePlateau(4, 5)).toBe(
      'Movimento inválido: sairia do plateau (4, 5)',
    );
  });
});
