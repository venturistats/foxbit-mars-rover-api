import { parseMissionInput } from './mission-input.parser';
import { executeMission } from './mission-executor';

export class ProcessMissionUseCase {
  run(input: string): string {
    const { plateau, rovers } = parseMissionInput(input);
    const results: string[] = [];
    for (const { rover, commands } of rovers) {
      executeMission(plateau, rover, commands);
      results.push(rover.toString());
    }
    return results.join('\n');
  }
}