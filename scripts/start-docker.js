require('shelljs/global');
const package = require('../package.json');

const tagBase = process.argv[2] ? `${process.argv[2]}:` : '';

config.fatal = true;

exec(`docker run -p 8080:80 -t ${tagBase}${package.version}`);