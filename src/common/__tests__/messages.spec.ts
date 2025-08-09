import { ERROR_MESSAGES } from '../errors/messages';

describe('ERROR_MESSAGES', () => {
  it('generates dynamic messages', () => {
    expect(ERROR_MESSAGES.invalidDirection('Y')).toBe('Direção inválida: Y');
  });
});

