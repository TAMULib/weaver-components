#!/usr/bin/env node

const shell = require('shelljs')
const package = require('../package.json');

const versionParts = package.version.split('.');
const majorVersion = versionParts[0];
const majorMinorVersion = `${versionParts[0]}.${versionParts[1]}`;
const tagBase = process.env.npm_package_config_DOCKER_SERVER.length ? 
                `${process.env.npm_package_config_DOCKER_SERVER}:` : 
                '';
const dockerCmd = `docker build --build-arg MAJOR_VERSION=${majorVersion} --build-arg MAJOR_MINOR_VERSION=${majorMinorVersion} -t ${tagBase}${package.version} .`;

shell.config.fatal = true;

if (!shell.which('docker')) {
  shell.echo('Sorry, this script requires docker to be installed');
  shell.exit(1);
}

if (shell.exec(dockerCmd).code !== 0) {
  shell.echo('Error: docker build failed');
  shell.exit(1);
}
