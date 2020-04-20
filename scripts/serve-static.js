const fs = require('fs');
const process = require('process');
const StaticServer = require('static-server');

const fsPromises = fs.promises;
const basePath = 'dist/bundle';
const latestPath = `${basePath}/latest`;

const server = new StaticServer({
  rootPath: 'dist/bundle/latest',
  port: 8080,
  name: 'tl-component-static-server',
  followSymlink: true,
});

server.start(function () {
  console.log('Server listening to', server.port);
  fsPromises.copyFile('index.html', `${latestPath}/index.html`);
});

process.on('exit', function () {
  fs.unlink(`${latestPath}/index.html`, err => {
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
