const fs = require('fs-extra');
const concat = require('concat');
const cp = require('child_process');

const assetPath = 'dist/weaver-components';
const bundlePath = 'dist/bundle';

cp.fork(__dirname + '/build-wvr-config-template.js');

(async function build() {
  const files = [
    'dist/weaver-components/runtime-es5.js',
    'dist/weaver-components/polyfills-es5.js',
    'dist/weaver-components/styles-es5.js',
    'dist/weaver-components/scripts.js',
    // 'dist/weaver-components/vendor-es5.js',
    'dist/weaver-components/main-es5.js'
  ];

  fs.ensureDir(bundlePath);

  await concat(files, `${bundlePath}/weaver-components.js`);
  fs.copy('dist/weaver-components/assets', "dist/static/docs/usage/assets");
  fs.copy(`${assetPath}/assets`, `${bundlePath}/assets`);

  fs.copy('scripts', "dist/wvr-elements/scripts");
  fs.copy('.wvr-ud', "dist/wvr-elements/.wvr-ud");

})();
