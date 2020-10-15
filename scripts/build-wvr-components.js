const fs = require('fs-extra');
const concat = require('concat');

const package = require('../projects/wvr-elements/package.json');

const versionParts = package.version.split('.');
const majorVersion = versionParts[0];
const majorMinorVersion = `${versionParts[0]}.${versionParts[1]}`;

const assetPath = 'dist/weaver-components/assets';
const bundlePath = 'dist/bundle';

(async function build() {
  const files = [
    'dist/weaver-components/runtime-es5.js',
    'dist/weaver-components/polyfills-es5.js',
    'dist/weaver-components/styles-es5.js',
    'dist/weaver-components/scripts.js',
    // 'dist/weaver-components/vendor-es5.js',
    'dist/weaver-components/main-es5.js'
  ];

  await fs.ensureDir(bundlePath);
  await fs.ensureDir(`${bundlePath}/latest`);
  await fs.ensureDir(`${bundlePath}/${majorVersion}`);
  await fs.ensureDir(`${bundlePath}/${majorMinorVersion}`);

  await concat(files, `${bundlePath}/latest/weaver-components.js`);
  fs.copy('dist/config-template.json', `${bundlePath}/latest/config-template.json`);

  await concat(files, `${bundlePath}/${majorVersion}/weaver-components.js`);
  fs.copy('dist/config-template.json', `${bundlePath}/${majorVersion}/config-template.json`);

  await concat(files, `${bundlePath}/${majorMinorVersion}/weaver-components.js`);
  fs.copy('dist/config-template.json', `${bundlePath}/${majorMinorVersion}/config-template.json`);

  // NOTE: assets are not versioned
  fs.copy(`${assetPath}`, `${bundlePath}/assets`);

  await fs.ensureDir("dist/static/docs/usage/assets");
  fs.copy(`${assetPath}`, "dist/static/docs/usage/assets");

})();
