#!/usr/bin/env node

const fs = require('fs-extra');
const shell = require('shelljs')
const angularCli = require('@angular/cli');
const elementsPath = 'dist/wvr-elements';

const next = process.argv[2] ? '--tag next' : '';

angularCli.default({
  cliArgs: ['b', '--project=wvr-elements'],
  inputStream: process.stdin,
  outputStream: process.stdout
}).then(c => {
  fs.copySync('projects/wvr-elements/src/lib/shared/styles', `${elementsPath}/styles`);
  fs.copySync('scripts', `${elementsPath}/scripts`);
  fs.copySync('.wvr-ud', `${elementsPath}/.wvr-ud`);

  shell.exec(`npm publish ${elementsPath}/ ${next}`);

  shell.exit();
});
