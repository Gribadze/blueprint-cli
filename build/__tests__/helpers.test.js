"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
jest.mock('fs');
var fs_1 = __importDefault(require("fs"));
var path = __importStar(require("path"));
var helpers_1 = require("../helpers");
describe('helpers test', function () {
    var directoryPath = './should/create/directory';
    beforeEach(function () {
        jest.resetModules();
        jest.resetAllMocks();
    });
    it('should create directory', function () {
        fs_1.default.existsSync.mockReturnValue(false);
        helpers_1.makeDirectory(directoryPath);
        expect(fs_1.default.mkdirSync).toHaveBeenCalledTimes(1);
        expect(fs_1.default.mkdirSync).toHaveBeenCalledWith(path.resolve(directoryPath), { recursive: true });
    });
    it('should throw if directory exists', function () {
        fs_1.default.existsSync.mockReturnValue(true);
        var makeExistedDirectory = function () { return helpers_1.makeDirectory(directoryPath); };
        expect(makeExistedDirectory).toThrowError('Directory already exists');
    });
});
