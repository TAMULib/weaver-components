const fs = require('fs-extra');
const concat = require('concat');

(async function build() {
  fs.ensureDir("docs");
  fs.copy("index-doc.html", "docs/index.html");
})();
