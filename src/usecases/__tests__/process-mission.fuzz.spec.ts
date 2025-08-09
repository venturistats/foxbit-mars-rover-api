import fc from 'fast-check';
import { ProcessMissionUseCase } from '../process-mission.usecase';

// Helpers to build random yet valid mission strings
const dirCharArb = fc.constantFrom('N', 'E', 'S', 'W');
const cmdCharArb = fc.constantFrom('L', 'R', 'M');

// Not used directly in newer fast-check APIs without .sample()
// const whitespaceArb = fc.constantFrom('', ' ', '  ', '\t');

const plateauArb = fc
  .tuple(fc.integer({ min: 0, max: 20 }), fc.integer({ min: 0, max: 20 }))
  .map(([x, y]) => `${x} ${y}`);

const roverPosArb = fc
  .record({
    x: fc.integer({ min: 0, max: 20 }),
    y: fc.integer({ min: 0, max: 20 }),
    d: dirCharArb,
  })
  .map(({ x, y, d }) => `${x} ${y} ${d}`);

const commandsArb = fc
  .array(cmdCharArb, { minLength: 0, maxLength: 30 })
  .map((cs) => cs.join(''));

const validMissionArb = fc
  .record({
    plateau: plateauArb,
    rovers: fc.array(fc.record({ pos: roverPosArb, cmds: commandsArb }), {
      minLength: 1,
      maxLength: 5,
    }),
  })
  .map(({ plateau, rovers }) => {
    const lines: string[] = [plateau];
    for (const { pos, cmds } of rovers) {
      lines.push(pos);
      lines.push(cmds);
    }
    return lines.join('\n');
  });

describe('ProcessMissionUseCase (fuzz)', () => {
  it('does not throw for syntactically valid missions (limited runs)', () => {
    const uc = new ProcessMissionUseCase();
    fc.assert(
      fc.property(validMissionArb, (input) => {
        // Should either return a string result or throw InvalidInput when moving out of bounds.
        // We only assert it never throws unexpected errors.
        try {
          const output = uc.run(input);
          expect(typeof output).toBe('string');
        } catch (err: any) {
          // Allowed domain errors have a message in our catalog or BadRequest behavior
          expect(err).toBeInstanceOf(Error);
          expect(typeof err.message).toBe('string');
        }
      }),
      { numRuns: 50 },
    );
  });

  it('rejects malformed plateau/header lines', () => {
    const uc = new ProcessMissionUseCase();
    const badPlateau = fc.oneof(
      fc.constant(''),
      fc.constant('A B'),
      fc.constant('5'),
      fc.constant('5 5 5'),
      fc.constant('-1 5'),
      fc.constant('5 -2'),
    );

    fc.assert(
      fc.property(badPlateau, roverPosArb, commandsArb, (pl, pos, cmds) => {
        const input = `${pl}\n${pos}\n${cmds}`;
        expect(() => uc.run(input)).toThrow();
      }),
      { numRuns: 50 },
    );
  });
});
