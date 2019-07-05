import fs from 'fs';
import path from 'path';
import { BlueprintError } from './blueprint.error';

export function makeDirectory(directoryPath: string): void {
  const absolutePath = path.resolve(directoryPath);
  if (fs.existsSync(absolutePath)) {
    throw new BlueprintError('Directory already exists');
  }
  fs.mkdirSync(absolutePath, { recursive: true });
}
