const fs = require('fs-extra');
const concat = require('concat');
const package = require('../package.json');

const majorVersion = package.version.split('.')[0];
const assetPath = 'dist/weaver-components';
const configPath = 'src/config.json';
const basePath = 'dist/bundle';
const dirName = `${majorVersion}x`;
const dirPath = `${basePath}/${dirName}`;
const latestPath = `${basePath}/latest`;

(async function build() {
  const files = [
    'dist/weaver-components/runtime-es5.js',
    'dist/weaver-components/polyfills-es5.js',
    'dist/weaver-components/styles-es5.js',
    'dist/weaver-components/scripts.js',
    // 'dist/weaver-components/vendor-es5.js',
    'dist/weaver-components/main-es5.js'
  ];

  fs.ensureDir(dirPath);

  await concat(files, `${dirPath}/weaver-components.js`);
  fs.copy(configPath, `${dirPath}/config.json`);
  fs.copy(`${dirPath}/weaver-components.js`, `${latestPath}/weaver-components.js`);
  fs.copy(configPath, `${latestPath}/config.json`);
  fs.copy(`${dirPath}/weaver-components.js`, 'dist/static/docs/usage/weaver-components.js');
  fs.copy(configPath, 'dist/static/docs/usage/config.json');
  fs.copy('dist/weaver-components/assets', "dist/static/docs/usage/assets");

  // to ensure static assets present in latest and <latest>x folders
  fs.ensureDir(assetPath);
  fs.copy(`${assetPath}/assets`, `${dirPath}/assets`);
  fs.copy(`${assetPath}/assets`, `${latestPath}/assets`);
})();
