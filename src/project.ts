/* tslint:disable:object-literal-sort-keys */
import * as path from 'path';
import { createFile, execExternal, makeDirectory } from './helpers';
import { IUI } from './interfaces/IUI';
import { IProjectSettings } from './types/TProjectSettings';

const scripts = {
  JS: {
    test: 'jest',
    coverage: 'jest --coverage',
    start: 'node src',
    lint: 'eslint ./src --fix',
    prettier: 'prettier ./src/**/*.* --write',
  },
  TS: {
    test: 'jest',
    coverage: 'jest --coverage',
    start: 'ts-node src',
    lint: "tslint --fix --project '.'",
    prettier: 'prettier ./src/**/*.* --write',
  },
};

const husky = {
  hooks: {
    'pre-commit': 'lint-staged',
  },
};

const lintStaged = {
  JS: {
    'src/**/*.js': ['npm run prettier', 'npm run lint', 'git add'],
  },
  TS: {
    'src/**/*.ts': ['npm run prettier', 'npm run lint', 'git add'],
  },
};

const devDependencies = {
  JS: ['@types/jest', '@types/node', 'husky', 'jest', 'lint-staged', 'prettier', 'eslint'],
  TS: [
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
  ],
};

const gitignore = `node_modules/
coverage/
build/
`;

const jestConfig = {
  JS: `module.exports = {
  collectCoverageFrom: ['src/**/*.js'],
  notify: true,
  testEnvironment: 'node',
  verbose: true,
};
`,
  TS: `module.exports = {
  collectCoverageFrom: ['src/**/*.ts'],
  notify: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
};
`,
};

const prettierConfig = {
  JS: `module.exports = {
  singleQuote: true,
  printWidth: 100,
  trailingComma: 'all',
  arrowParens: 'always',
};
`,
  TS: `module.exports = {
  parser: 'typescript',
  singleQuote: true,
  printWidth: 100,
  trailingComma: 'all',
  arrowParens: 'always',
};
`,
};

const tsConfig = {
  compilerOptions: {
    esModuleInterop: true,
    module: 'commonjs',
    outDir: 'build',
    strict: true,
    target: 'es5',
  },
};

const lintConfig = {
  JS: {
    extends: ['eslint:recommended'],
  },
  TS: {
    defaultSeverity: 'error',
    extends: ['tslint:recommended'],
    jsRules: {},
    rules: {
      'object-literal-key-quotes': [true, 'as-needed'],
      quotemark: false,
    },
    rulesDirectory: [],
  },
};

class Project {
  constructor(public readonly projectSettings: IProjectSettings, private readonly ui: IUI) {}

  public async generate(): Promise<void> {
    const { directory, name, description, language } = this.projectSettings;
    this.ui.write('Creating project directory...');
    makeDirectory(directory);
    this.ui.writeln('OK');
    this.ui.write('Configuring project development environment...');
    const packageJsonData = {
      name,
      description,
      scripts: scripts[language],
      husky,
      'lint-staged': lintStaged[language],
    };
    createFile(path.join(directory, 'package.json'), JSON.stringify(packageJsonData, null, 2));
    createFile(path.join(directory, 'jest.config.js'), jestConfig[language]);
    createFile(path.join(directory, 'prettier.config.js'), prettierConfig[language]);
    createFile(path.join(directory, '.gitignore'), gitignore);
    switch (language) {
      case 'JS':
        createFile(
          path.join(directory, '.eslintrc'),
          JSON.stringify(lintConfig[language], null, 2),
        );
        break;
      case 'TS':
        createFile(path.join(directory, 'tsconfig.json'), JSON.stringify(tsConfig, null, 2));
        createFile(
          path.join(directory, 'tslint.json'),
          JSON.stringify(lintConfig[language], null, 2),
        );
        break;
      default:
        break;
    }
    const srcDirectory = path.join(directory, 'src');
    makeDirectory(srcDirectory);
    createFile(
      path.join(srcDirectory, `index.${language === 'TS' ? 't' : 'j'}s`),
      '// TODO: Happy coding!\n',
    );
    this.ui.writeln('OK');
    this.ui.write('Initialize local git repository...');
    await execExternal(`cd ${directory} && git init`);
    this.ui.writeln('OK');
    this.ui.write('Installing development dependencies...');
    await execExternal(`cd ${directory} && npm i -D ${devDependencies[language].join(' ')}`);
    this.ui.writeln('OK');
    this.ui.write('Initial project commit...');
    await execExternal(
      `cd ${directory} && git add . && git commit -am 'initial blueprint commit'`,
      (error, data) => {
        if (error) {
          this.ui.write(error.toString());
        }
        if (data) {
          this.ui.write(data);
        }
      },
    );
    this.ui.writeln('OK');
  }
}

export default Project;
