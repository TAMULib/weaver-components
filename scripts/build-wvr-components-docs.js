const fs = require('fs-extra');

(async function build() {
  fs.ensureDir("docs");
  fs.copy("index-doc.html", "docs/index.html");
})();
