import { ERROR_MESSAGES } from '../errors/messages';

describe('ERROR_MESSAGES', () => {

  it('contains the expected static messages', () => {
    expect(ERROR_MESSAGES.plateauDimsInvalid).toBe('Dimensões do plateau inválidas');
  });

  it('generates dynamic messages', () => {
    expect(ERROR_MESSAGES.invalidCommand('X')).toBe('Comando inválido: X');
    expect(ERROR_MESSAGES.invalidDirection('Y')).toBe('Direção inválida: Y');
    expect(ERROR_MESSAGES.movementWouldLeavePlateau(4, 5)).toBe('Movimento inválido: sairia do plateau (4, 5)');
  });
});

