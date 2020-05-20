const fs = require('fs-extra');

(async function build() {
  fs.ensureDir("static");
  fs.copy("index-static.html", "static/index.html");
})();
