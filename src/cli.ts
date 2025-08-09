#!/usr/bin/env node
/* istanbul ignore file */
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { ProcessMissionUseCase } from './usecases/process-mission.usecase';

function printUsage(): void {
  console.log('Usage:');
  console.log('  yarn cli --file path/to/input.txt');
  console.log('  yarn cli path/to/input.txt');
}

function getFilePathFromArgs(argv: string[]): string | null {
  const args = argv.slice(2);
  const flagIndex = args.indexOf('--file');
  if (flagIndex !== -1 && args[flagIndex + 1]) {
    return args[flagIndex + 1];
  }
  if (args[0] && !args[0].startsWith('--')) {
    return args[0];
  }
  return null;
}

async function main(): Promise<void> {
  const filePath = getFilePathFromArgs(process.argv);
  if (!filePath) {
    printUsage();
    process.exit(1);
  }

  const absolutePath = resolve(process.cwd(), filePath);

  try {
    const text = readFileSync(absolutePath, 'utf8');
    const usecase = new ProcessMissionUseCase();
    const result = usecase.run(text);
    console.log(result);
  } catch (error: any) {
    console.error(error?.message ?? String(error));
    process.exit(2);
  }
}

main();

