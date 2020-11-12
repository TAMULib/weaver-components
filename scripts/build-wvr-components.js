#!/usr/bin/env node

const fs = require('fs-extra');
const concat = require('concat');
const cp = require('child_process');

const componentsPath = 'dist/weaver-components';
const elementsPath = 'dist/wvr-elements';

const bundlePath = 'dist/bundle';
const usagePath = 'dist/static/docs/usage';

cp.fork(__dirname + '/build-wvr-config-template.js');

(async function build() {
  const files = [
    `${componentsPath}/runtime-es5.js`,
    `${componentsPath}/polyfills-es5.js`,
    `${componentsPath}/styles-es5.js`,
    `${componentsPath}/scripts.js`,
    // `${componentsPath}/vendor-es5.js`,
    `${componentsPath}/main-es5.js`
  ];

  fs.ensureDir(bundlePath);

  fs.ensureDir(usagePath);

  await concat(files, `${bundlePath}/weaver-components.js`);
  fs.copy(`${componentsPath}/assets`, `${usagePath}/assets`);
  fs.copy(`${componentsPath}/assets`, `${bundlePath}/assets`);

  fs.copy('scripts', `${elementsPath}/scripts`);
  fs.copy('.wvr-ud', `${elementsPath}/.wvr-ud`);

})();
