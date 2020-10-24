#! /usr/bin/env node

const fs = require('fs-extra');
const angularCli = require('@angular/cli');

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
    process.exit(c);
  });
