// const fs = require('fs-extra');
const concat = require('concat');

(async function build() {
  const files = [
    'dist/weaver-components/runtime-es5.js',
    'dist/weaver-components/polyfills-es5.js',
    // 'dist/weaver-components/styles-es5.js',
    'dist/weaver-components/scripts.js',
    // 'dist/weaver-components/vendor-es5.js',
    'dist/weaver-components/main-es5.js'
  ];

  await concat(files, 'dist/weaver-components.js');

  // await fs.remove("dist/weaver-components");

})();