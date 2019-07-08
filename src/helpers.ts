import { exec, SpawnOptions } from 'child_process';
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

export function createFile(filePath: string, data: string) {
  const absolutePath = path.resolve(filePath);
  if (fs.existsSync(absolutePath)) {
    throw new BlueprintError('File already exists');
  }
  fs.writeFileSync(absolutePath, data, { flag: 'wx' });
}

export function execExternal(
  command: string,
  callback?: (error: Error | null, data: string | null) => void,
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const npmProcess = exec(command);
    if (!npmProcess) {
      throw new BlueprintError('Error while running child process: ' + command);
    }
    if (npmProcess.stdout) {
      npmProcess.stdout.on('data', (data) => {
        if (callback) {
          callback(null, data.toString());
        }
      });
    }
    if (npmProcess.stderr) {
      npmProcess.stderr.on('data', (data) => {
        if (callback) {
          callback(new BlueprintError(data.toString()), null);
        }
      });
    }
    npmProcess.on('close', (code) => {
      if (code !== 0) {
        reject(false);
      }
      resolve(true);
    });
  });
}

// export function removeDirectory(directoryPath: string): void {
//   const absolutePath = path.resolve(directoryPath);
//   if (!fs.existsSync(absolutePath)) {
//     throw new BlueprintError('Directory doesn\'t exists');
//   }
//   directoryPath.split(path.sep).forEach((_, index, directories) => {
//     fs.rmdirSync(directories.slice(0, -index).join(path.sep));
//   });
// }
