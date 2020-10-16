const shell = require('shelljs')
const package = require('../package.json');

const tagBase = process.env.npm_package_config_DOCKER_SERVER.length ? 
                `${process.env.npm_package_config_DOCKER_SERVER}:` : 
                '';
const dockerCmd = `docker run --env-file=defaults-dev-overrides.env -p 8080:80 -t ${tagBase}${package.version}`;

shell.config.fatal = true;

if (!shell.which('docker')) {
  shell.echo('This script requires docker to be installed');
  shell.exit(1);
}

if (shell.exec(dockerCmd).code !== 0) {
  shell.echo('Error: docker run failed');
  shell.exit(1);
}
