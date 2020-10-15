require('shelljs/global');
const package = require('../package.json');

const versionParts = package.version.split('.');
const majorVersion = versionParts[0];
const majorMinorVersion = `${versionParts[0]}.${versionParts[1]}`;
const tagBase = process.argv[2] ? `${process.argv[2]}:` : '';

config.fatal = true;

if (!shell.which('docker')) {
  shell.echo('Sorry, this script requires docker to be installed');
  shell.exit(1);
}

exec(`docker build --build-arg MAJOR_VERSION=${majorVersion} --build-arg MAJOR_MINOR_VERSION=${majorMinorVersion} -t ${tagBase}${package.version} .`);