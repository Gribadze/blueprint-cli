import ConsoleUI from './console.ui';
import { makeDirectory } from './helpers';
import { IProjectSettings } from './types/project.settings';

async function main() {
  const ui = new ConsoleUI();
  const projectSettings: IProjectSettings = {
    name: await ui.ask('Project name:'),
  };
  makeDirectory(projectSettings.name);
  process.stdout.write(`Project settings: ${JSON.stringify(projectSettings, null, 2)}\n`);
}

main()
  .then(() => {
    process.stdout.write('Happy codding!\n');
    process.exit(0);
  })
  .catch(() => {
    process.stderr.write("Don't worry. Please try again.");
    process.exit(1);
  });
