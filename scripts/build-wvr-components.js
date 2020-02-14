const fs = require('fs-extra');
const concat = require('concat');

const package = require('../package.json');
const majorVersion = package.version.split('.')[0];
const dirName = `${majorVersion}x`;

(async function build() {
  const files = [
    'dist/weaver-components/runtime-es5.js',
    'dist/weaver-components/polyfills-es5.js',
    // 'dist/weaver-components/styles-es5.js',
    'dist/weaver-components/scripts.js',
    // 'dist/weaver-components/vendor-es5.js',
    'dist/weaver-components/main-es5.js'
  ];

  fs.ensureDir(`dist/bundle/${dirName}`);

  await concat(files, `dist/bundle/${dirName}/weaver-components.js`);

})();
