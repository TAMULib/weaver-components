const fs = require('fs-extra');
const concat = require('concat');

(async function build() {
  const files = [
    'dist/weaver-components/runtime-es2015.js',
    'dist/weaver-components/polyfills-es2015.js',
    'dist/weaver-components/scripts.js',
    'dist/weaver-components/main-es2015.js'
  ];

  await fs.ensureDir('bld-tmp');
  await concat(files, 'bld-tmp/weaver-components.js');
  await fs.remove("dist");
  await fs.ensureDir('dist');
  
  await fs.copyFile(
    'bld-tmp/weaver-components.js',
    'dist/weaver-components.js'
  );
  await fs.remove("bld-tmp");

})();