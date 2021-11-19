#!/usr/bin/env node
const fs = require('fs-extra');

if (fs.existsSync('./dist')) {
  fs.writeFile('./dist/bundle/version.txt', process.env.npm_package_version);
}
