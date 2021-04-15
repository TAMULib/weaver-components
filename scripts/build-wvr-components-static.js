#!/usr/bin/env node

const fs = require('fs-extra');
const staticPath = 'static';
const weaverComponentsPath = 'static/weaver-components';
const docPath = `${weaverComponentsPath}/docs`;
const reportPath = `${weaverComponentsPath}/reports`;

(async function build() {
  fs.ensureDir(`${docPath}/`);
  fs.ensureDir(`${reportPath}`);

  fs.copy("src/index-static.html", `${weaverComponentsPath}/index.html`);
  fs.copy("src/assets", `${weaverComponentsPath}/assets`);

  fs.copy("src/index-static.html", `${staticPath}/index.html`);
  fs.copy("src/assets", `${staticPath}/assets`);

  fs.copy("src/index-docs.html", `${docPath}/index.html`);
  fs.copy("src/assets", `${docPath}/assets`);

  fs.copy("src/index-reports.html", `${reportPath}/index.html`);
  fs.copy("src/assets", `${reportPath}/assets`);

  if( fs.existsSync("dist/bundle/assets/tinymce") ) {
    fs.copy("dist/bundle/assets/tinymce", `${docPath}/usage/assets/tinymce`);
  }

})();
