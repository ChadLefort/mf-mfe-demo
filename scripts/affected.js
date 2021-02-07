// @ts-nocheck
const execSync = require('child_process').execSync;
const args = process.argv.slice(2);

try {
  const results = execSync(`npx nx print-affected ${args.join(' ')}`).toString();
  const affected = JSON.parse(results);

  if (affected.projects) {
    const { projects } = require('../workspace.json');

    console.log(
      Object.entries(projects)
        .map((p) => affected.projects.includes(p[0]) && p)
        .filter(Boolean)
    );
  }
} catch (error) {
  console.error(error);
  process.exit(1);
}
