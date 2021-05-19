#!/usr/bin/env node

const fs = require('fs');
const process = require('process');
const StaticServer = require('static-server');
const fsPromises = fs.promises;
const basePath = 'dist/bundle';

const server = new StaticServer({
  rootPath: 'dist/bundle',
  port: 8080,
  name: 'wvr-component-static-server',
  followSymlink: true,
});

server.start(function () {
  console.log('Server listening to', server.port);
  fsPromises.copyFile('src/index.html', `${basePath}/index.html`);
});

process.on('exit', function () {
  fs.unlink(`${basePath}/index.html`, err => {
    if (err) throw err;
  });
  fs.unlink(`${basePath}/config.json`, err => {
    if (err) throw err;
  });
  console.log('Cleaning up');
});

process.on('SIGINT', function () {
  process.exit();
});

process.on('uncaughtException', function (e) {
  console.log(e.stack);
  process.exit(99);
});
