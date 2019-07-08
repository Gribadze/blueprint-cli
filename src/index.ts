#!/usr/bin/env node
import ConsoleUI from './console.ui';
import Project from './project';

function validateArguments() {
  return process.argv.length > 2;
}

async function main() {
  const ui = new ConsoleUI();
  const name = await ui.ask('Project name:');
  const description = await ui.ask('Description:');
  const project = new Project({ directory: process.argv[2], name, description }, ui);
  await project.generate();
}
if (validateArguments()) {
  main()
    .then(() => {
      process.stdout.write('Happy codding!\n');
      process.exit(0);
    })
    .catch((error) => {
      process.stderr.write('We have an error!\n');
      process.stderr.write(`${error.message}\n${error.stack}\n`);
      process.stderr.write("Don't worry. Please try again.\n");
      process.exit(1);
    });
} else {
  process.stderr.write(`Usage example:\n\tblueprint PROJECT_DIRECTORY\n`);
}
