require('shelljs/global');
const package = require('../package.json');

const tagBase = process.argv[2] ? `${process.argv[2]}:` : '';

config.fatal = true;

if (!shell.which('docker')) {
  shell.echo('Sorry, this script requires docker to be installed');
  shell.exit(1);
}

exec(`docker run -p 8080:80 -t ${tagBase}${package.version}`);