const fs = require('fs-extra');
const docPath = 'static/docs';
const reportPath = 'static/reports';

(async function build() {
  fs.ensureDir(`${docPath}/`);
  fs.ensureDir(`${reportPath}`);

  fs.copy("index-docs.html", `${docPath}/index.html`);
  fs.copy("index-reports.html", `${reportPath}/index.html`);
  fs.copy("src/assets", `${docPath}/assets`);

})();
