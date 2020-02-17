const fs = require('fs-extra');
const concat = require('concat');

const package = require('../package.json');
const majorVersion = package.version.split('.')[0];
const dirName = `${majorVersion}x`;
const dirPath = `dist/bundle/${dirName}`;

(async function build() {
  const files = [
    'dist/weaver-components/runtime-es5.js',
    'dist/weaver-components/polyfills-es5.js',
    // 'dist/weaver-components/styles-es5.js',
    'dist/weaver-components/scripts.js',
    // 'dist/weaver-components/vendor-es5.js',
    'dist/weaver-components/main-es5.js'
  ];

  fs.ensureDir(dirPath);

  await concat(files, `${dirPath}/weaver-components.js`);
  fs.copy(`${dirPath}/weaver-components.js`, "dist/docs/usage/weaver-components.js");

})();
