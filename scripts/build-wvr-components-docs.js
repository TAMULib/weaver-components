const fs = require('fs-extra');
const docPath = 'static/docs';

(async function build() {
  fs.ensureDir(`${docPath}/`);
  fs.copy("index-docs.html", `${docPath}/index.html`);
  fs.copy("src/assets", `${docPath}/assets`);
})();
