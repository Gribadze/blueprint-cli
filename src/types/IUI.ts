export interface IUI {
  ask(question: string): Promise<string>;
  select(question: string, choices: string[]): Promise<string>;
  write(text: string): void;
  writeln(text: string): void;
}
