"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var path = __importStar(require("path"));
var helpers_1 = require("./helpers");
var scripts = {
    coverage: 'jest --coverage',
    lint: "tslint --fix --project '.'",
    prettier: 'prettier ./src/**/*.* --write',
    start: 'ts-node src',
    test: 'jest',
};
var husky = {
    hooks: {
        'pre-commit': 'lint-staged',
    },
};
var lintStaged = {
    'src/**/*.ts': ['npm run prettier', 'npm run lint', 'git add'],
};
var devDependencies = [
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
var gitignore = "node_modules/\ncoverage/\n";
var jestConfig = "module.exports = {\n  collectCoverageFrom: ['src/**/*.ts'],\n  notify: true,\n  preset: 'ts-jest',\n  testEnvironment: 'node',\n  verbose: true,\n};\n";
var prettierConfig = "module.exports = {\n  parser: 'typescript',\n  singleQuote: true,\n  printWidth: 100,\n  trailingComma: 'all',\n  arrowParens: 'always',\n};\n";
var tsConfig = {
    compilerOptions: {
        esModuleInterop: true,
        module: 'commonjs',
        strict: true,
        target: 'es5',
    },
};
var tsLintConfig = {
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
var Project = /** @class */ (function () {
    function Project(projectSettings, ui) {
        this.projectSettings = projectSettings;
        this.ui = ui;
    }
    Project.prototype.generate = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, directory, name, description, packageJsonData, srcDirectory;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.projectSettings, directory = _a.directory, name = _a.name, description = _a.description;
                        this.ui.write('Creating project directory...');
                        helpers_1.makeDirectory(directory);
                        this.ui.writeln('OK');
                        this.ui.write('Configuring project development environment...');
                        packageJsonData = { name: name, description: description, scripts: scripts, husky: husky, 'lint-staged': lintStaged };
                        helpers_1.createFile(path.join(directory, 'package.json'), JSON.stringify(packageJsonData, null, 2));
                        helpers_1.createFile(path.join(directory, 'jest.config.js'), jestConfig);
                        helpers_1.createFile(path.join(directory, 'prettier.config.js'), prettierConfig);
                        helpers_1.createFile(path.join(directory, '.gitignore'), gitignore);
                        helpers_1.createFile(path.join(directory, 'tsconfig.json'), JSON.stringify(tsConfig, null, 2));
                        helpers_1.createFile(path.join(directory, 'tslint.json'), JSON.stringify(tsLintConfig, null, 2));
                        srcDirectory = path.join(directory, 'src');
                        helpers_1.makeDirectory(srcDirectory);
                        helpers_1.createFile(path.join(srcDirectory, 'index.ts'), '// TODO: Happy coding!\n');
                        this.ui.writeln('OK');
                        this.ui.write('Initialize local git repository...');
                        return [4 /*yield*/, helpers_1.execExternal("cd " + directory + " && git init")];
                    case 1:
                        _b.sent();
                        this.ui.writeln('OK');
                        this.ui.write('Installing development dependencies...');
                        return [4 /*yield*/, helpers_1.execExternal("cd " + directory + " && npm i -D " + devDependencies.join(' '))];
                    case 2:
                        _b.sent();
                        this.ui.writeln('OK');
                        this.ui.write('Initial project commit...');
                        return [4 /*yield*/, helpers_1.execExternal("cd " + directory + " && git add . && git commit -am 'initial blueprint commit'", function (error, data) {
                                if (error) {
                                    _this.ui.write(error.toString());
                                }
                                if (data) {
                                    _this.ui.write(data);
                                }
                            })];
                    case 3:
                        _b.sent();
                        this.ui.writeln('OK');
                        return [2 /*return*/];
                }
            });
        });
    };
    return Project;
}());
exports.default = Project;
