const fs = require('fs-extra');
const staticPath = 'static/weaver-components';
const docPath = `${staticPath}/docs`;
const reportPath = `${staticPath}/reports`;

(async function build() {
  fs.ensureDir(`${docPath}/`);
  fs.ensureDir(`${reportPath}`);

  fs.copy("src/config-docs.json", `${staticPath}/config.json`);
  fs.copy("src/index-static.html", `${staticPath}/index.html`);
  fs.copy("src/index-docs.html", `${docPath}/index.html`);
  fs.copy("src/index-reports.html", `${reportPath}/index.html`);
  fs.copy("src/assets", `${docPath}/assets`);

})();
