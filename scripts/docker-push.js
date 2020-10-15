require('shelljs/global');
const package = require('../package.json');

const tagBase = process.argv[2] ? `${process.argv[2]}:` : '';

config.fatal = true;

exec(`docker push ${tagBase}${package.version}`);