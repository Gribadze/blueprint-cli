import readline, { ReadLine } from 'readline';
import { IUI } from './types/IUI';

class ConsoleUI implements IUI {
  private rl: ReadLine;
  private readonly input: NodeJS.ReadableStream;
  private readonly output: NodeJS.WritableStream;

  constructor() {
    this.input = process.stdin;
    this.output = process.stdout;
    this.rl = readline.createInterface({
      input: this.input,
      output: this.output,
      prompt: '\u25B6 ',
      terminal: true,
    });
  }

  public ask(question: string): Promise<string> {
    return new Promise((resolve) => {
      this.rl.question(`${question} `, (answer) => {
        resolve(answer);
      });
    });
  }

  public select(question: string, options: string[]): Promise<string> {
    return new Promise((resolve) => {
      const renderString = [
        question,
        ...options.map((option, index) => `${index + 1}) ${option}`),
        '',
      ].join('\n');
      this.rl.write(renderString);
      readline.cursorTo(this.output, 0);
      readline.moveCursor(this.output, question.length + 1, -options.length - 1);
      this.rl.on('line', (choice) => {
        readline.clearScreenDown(this.output);
        const answerIndex = parseInt(choice, 10);
        resolve(options[answerIndex - 1]);
      });
    });
  }

  public write(text: string): void {
    this.output.write(text);
  }

  public writeln(text: string): void {
    this.write(text + '\n');
  }
}

export default ConsoleUI;
