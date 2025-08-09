export const ERROR_MESSAGES = {
  invalidDirection: (value: string) => `Direção inválida: ${value}`,
  invalidCommand: (ch: string) => `Comando inválido: ${ch}`,
  movementWouldLeavePlateau: (x: number, y: number) =>
    `Movimento inválido: sairia do plateau (${x}, ${y})`,
  plateauDimsInvalid: 'Dimensões do plateau inválidas',
};
