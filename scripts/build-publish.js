#! /usr/bin/env node

const fs = require('fs-extra');
const shell = require('shelljs')
const angularCli = require('@angular/cli');

const next = process.argv[2] ?
             '--tag next' :
             '';

angularCli.default({
    cliArgs: [
      'b',
      '--project=wvr-elements'
    ],
    inputStream: process.stdin,
    outputStream: process.stdout
  }).then(c => {
    fs.copySync('scripts', "dist/wvr-elements/scripts");
    fs.copySync('.wvr-ud', "dist/wvr-elements/.wvr-ud");
    
    shell.exec(`npm publish dist/wvr-elements/ ${next}`);

    shell.exit();

  });
