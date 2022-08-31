#!/usr/bin/env node
const fs = require('fs-extra');

if (fs.existsSync('./dist')) {

  if (!fs.existsSync('./dist/bundle')) {
    fs.mkdir('./dist/bundle');
  }

  fs.writeFile('./dist/bundle/version.txt', process.env.npm_package_version);
}
