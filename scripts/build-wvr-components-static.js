const fs = require('fs-extra');
const staticPath = 'static';
const weaverComponentsPath = 'static/weaver-components';
const docPath = `${weaverComponentsPath}/docs`;
const reportPath = `${weaverComponentsPath}/reports`;

(async function build() {
  fs.ensureDir(`${docPath}/`);
  fs.ensureDir(`${reportPath}`);

  fs.copy("src/config-docs.json", `${weaverComponentsPath}/config.json`);
  fs.copy("src/config-docs.json", `${staticPath}/config.json`);
  fs.copy("src/index-static.html", `${staticPath}/index.html`);
  fs.copy("src/index-docs.html", `${docPath}/index.html`);
  fs.copy("src/index-reports.html", `${reportPath}/index.html`);
  fs.copy("src/assets", `${docPath}/assets`);

})();
