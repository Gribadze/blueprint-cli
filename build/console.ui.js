"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var readline_1 = __importDefault(require("readline"));
var ConsoleUI = /** @class */ (function () {
    function ConsoleUI() {
        this.input = process.stdin;
        this.output = process.stdout;
        this.rl = readline_1.default.createInterface({
            input: this.input,
            output: this.output,
            prompt: '\u25B6 ',
            terminal: true,
        });
    }
    ConsoleUI.prototype.ask = function (question) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.rl.question(question + " ", function (answer) {
                resolve(answer);
            });
        });
    };
    ConsoleUI.prototype.select = function (question, options) {
        var _this = this;
        return new Promise(function (resolve) {
            var renderString = [
                question
            ].concat(options.map(function (option, index) { return index + 1 + ") " + option; }), [
                '',
            ]).join('\n');
            _this.rl.write(renderString);
            readline_1.default.cursorTo(_this.output, 0);
            readline_1.default.moveCursor(_this.output, question.length + 1, -options.length - 1);
            _this.rl.on('line', function (choice) {
                readline_1.default.clearScreenDown(_this.output);
                var answerIndex = parseInt(choice, 10);
                resolve(options[answerIndex - 1]);
            });
        });
    };
    ConsoleUI.prototype.write = function (text) {
        this.output.write(text);
    };
    ConsoleUI.prototype.writeln = function (text) {
        this.write(text + '\n');
    };
    return ConsoleUI;
}());
exports.default = ConsoleUI;
