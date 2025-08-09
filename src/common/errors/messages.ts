export const ERROR_MESSAGES = {
  inputTooShort: 'Entrada inválida: muito curta',
  plateauLineInvalid: 'Linha do plateau inválida',
  plateauCoordsInvalid: 'Coordenadas do plateau inválidas',
  entryTruncated: 'Entrada truncada: faltou linha de posição',
  roverPositionInvalid: (line: string) => `Posição do rover inválida: "${line}"`,
  roverCoordsInvalid: 'Coordenadas do rover inválidas',
  missingCommands: 'Faltam comandos para um rover',
  invalidCommand: (ch: string) => `Comando inválido: ${ch}`,
  invalidDirection: (value: string) => `Direção inválida: ${value}`,
  plateauDimsInvalid: 'Dimensões do plateau inválidas',
  roverInitOutside: (x: number, y: number) => `Rover inicial fora dos limites: ${x} ${y}`,
  movementWouldLeavePlateau: (x: number, y: number) => `Movimento inválido: sairia do plateau (${x}, ${y})`,
};

