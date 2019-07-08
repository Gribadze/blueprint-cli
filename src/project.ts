import * as path from 'path';
import { createFile, execExternal, makeDirectory } from './helpers';
import { IUI } from './types/IUI';
import { IProjectSettings } from './types/project.settings';

const scripts = {
  coverage: 'jest --coverage',
  lint: "tslint --fix --project '.'",
  prettier: 'prettier ./src/**/*.* --write',
  start: 'ts-node src',
  test: 'jest',
};

const husky = {
  hooks: {
    'pre-commit': 'lint-staged',
  },
};

const lintStaged = {
  'src/**/*.ts': ['npm run prettier', 'npm run lint', 'git add'],
};

const devDependencies = [
  '@types/jest',
  '@types/node',
  'husky',
  'jest',
  'lint-staged',
  'prettier',
  'ts-jest',
  'ts-node',
  'tslint',
  'typescript',
];

const gitignore = `node_modules/
coverage/
`;

const jestConfig = `module.exports = {
  collectCoverageFrom: ['src/**/*.ts'],
  notify: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
};
`;

const prettierConfig = `module.exports = {
  parser: 'typescript',
  singleQuote: true,
  printWidth: 100,
  trailingComma: 'all',
  arrowParens: 'always',
};
`;

const tsConfig = {
  compilerOptions: {
    esModuleInterop: true,
    module: 'commonjs',
    strict: true,
    target: 'es5',
  },
};

const tsLintConfig = {
  defaultSeverity: 'error',
  extends: [
    'tslint:recommended',
  ],
  jsRules: {},
  rules: {
    quotemark: false,
  },
  rulesDirectory: [],
};

class Project {
  private readonly projectSettings: IProjectSettings;
  private readonly ui: IUI;

  constructor(projectSettings: IProjectSettings, ui: IUI) {
    this.projectSettings = projectSettings;
    this.ui = ui;
  }

  public async generate(): Promise<void> {
    const { directory, name, description } = this.projectSettings;
    this.ui.write('Creating project directory...');
    makeDirectory(directory);
    this.ui.writeln('OK');
    this.ui.write('Configuring project development environment...');
    const packageJsonData = { name, description, scripts, husky, 'lint-staged': lintStaged };
    createFile(path.join(directory, 'package.json'), JSON.stringify(packageJsonData, null, 2));
    createFile(path.join(directory, 'jest.config.js'), jestConfig);
    createFile(path.join(directory, 'prettier.config.js'), prettierConfig);
    createFile(path.join(directory, '.gitignore'), gitignore);
    createFile(path.join(directory, 'tsconfig.json'), JSON.stringify(tsConfig, null, 2));
    createFile(path.join(directory, 'tslint.json'), JSON.stringify(tsLintConfig, null, 2));
    const srcDirectory = path.join(directory, 'src');
    makeDirectory(srcDirectory);
    createFile(path.join(srcDirectory, 'index.ts'), '// TODO: Happy coding!\n');
    this.ui.writeln('OK');
    this.ui.write('Initialize local git repository...');
    await execExternal(`cd ${directory} && git init`);
    this.ui.writeln('OK');
    this.ui.write('Installing development dependencies...');
    await execExternal(`cd ${directory} && npm i -D ${devDependencies.join(' ')}`);
    this.ui.writeln('OK');
    this.ui.write('Initial project commit...');
    await execExternal(`cd ${directory} && git add . && git commit -am 'initial blueprint commit'`, (error, data) => {
      process.stdout.write('error: ' + error + '\n');
      process.stdout.write('data: ' + data + '\n');
    });
    this.ui.writeln('OK');
  }
}

export default Project;
