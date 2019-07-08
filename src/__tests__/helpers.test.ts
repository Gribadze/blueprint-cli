jest.mock('fs');
import fs from 'fs';
import * as path from 'path';
import { makeDirectory } from '../helpers';

describe('helpers test', () => {
  const directoryPath = './should/create/directory';
  beforeEach(() => {
    jest.resetModules();
    jest.resetAllMocks();
  });
  it('should create directory', () => {
    (fs.existsSync as jest.Mock).mockReturnValue(false);
    makeDirectory(directoryPath);
    expect(fs.mkdirSync).toHaveBeenCalledTimes(1);
    expect(fs.mkdirSync).toHaveBeenCalledWith(path.resolve(directoryPath), { recursive: true });
  });
  it('should throw if directory exists', () => {
    (fs.existsSync as jest.Mock).mockReturnValue(true);
    const makeExistedDirectory = () => makeDirectory(directoryPath);
    expect(makeExistedDirectory).toThrowError('Directory already exists');
  });
});
