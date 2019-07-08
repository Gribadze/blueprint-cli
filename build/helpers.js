"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var blueprint_error_1 = require("./blueprint.error");
function makeDirectory(directoryPath) {
    var absolutePath = path_1.default.resolve(directoryPath);
    if (fs_1.default.existsSync(absolutePath)) {
        throw new blueprint_error_1.BlueprintError('Directory already exists');
    }
    fs_1.default.mkdirSync(absolutePath, { recursive: true });
}
exports.makeDirectory = makeDirectory;
function createFile(filePath, data) {
    var absolutePath = path_1.default.resolve(filePath);
    if (fs_1.default.existsSync(absolutePath)) {
        throw new blueprint_error_1.BlueprintError('File already exists');
    }
    fs_1.default.writeFileSync(absolutePath, data, { flag: 'wx' });
}
exports.createFile = createFile;
function execExternal(command, callback) {
    return new Promise(function (resolve, reject) {
        var npmProcess = child_process_1.exec(command);
        if (!npmProcess) {
            throw new blueprint_error_1.BlueprintError('Error while running child process: ' + command);
        }
        if (npmProcess.stdout) {
            npmProcess.stdout.on('data', function (data) {
                if (callback) {
                    callback(null, data.toString());
                }
            });
        }
        if (npmProcess.stderr) {
            npmProcess.stderr.on('data', function (data) {
                if (callback) {
                    callback(new blueprint_error_1.BlueprintError(data.toString()), null);
                }
            });
        }
        npmProcess.on('close', function (code) {
            if (code !== 0) {
                reject(false);
            }
            resolve(true);
        });
    });
}
exports.execExternal = execExternal;
// export function removeDirectory(directoryPath: string): void {
//   const absolutePath = path.resolve(directoryPath);
//   if (!fs.existsSync(absolutePath)) {
//     throw new BlueprintError('Directory doesn\'t exists');
//   }
//   directoryPath.split(path.sep).forEach((_, index, directories) => {
//     fs.rmdirSync(directories.slice(0, -index).join(path.sep));
//   });
// }
