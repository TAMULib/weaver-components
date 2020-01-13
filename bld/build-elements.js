const fs = require('fs-extra');
const concat = require('concat');

(async function build() {
  const files = [
    'dist/weaver-components/runtime-es2015.js',
    'dist/weaver-components/polyfills-es2015.js',
    'dist/weaver-components/scripts.js',
    'dist/weaver-components/main-es2015.js'
  ];

  await concat(files, 'dist/weaver-components.js');

})();