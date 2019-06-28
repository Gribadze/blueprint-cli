import ConsoleUI from './console.ui';

async function main() {
  const ui = new ConsoleUI();
  const userName = await ui.ask('What is your name?');
  const language = await ui.select('Choose preferred language:', ['JavaScript', 'TypeScript']);
  const userAge = await ui.ask('bla');
}

main()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));
