const fs = require('fs-extra');
const docsPath = 'static/docs';
const compodocPath = './development';

(async function build() {
  fs.ensureDir(`${docsPath}/`) && fs.ensureDir(`${compodocPath}/`);
  fs.copy(`${compodocPath}/`, `${docsPath}/development`);
})();
