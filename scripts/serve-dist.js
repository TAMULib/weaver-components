#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const express = require('express');
const compression = require('compression');

const server = express();

server.use(compression({
  filter: (req, res) => {
    if (req.headers['x-no-compression']) {
      return false;
    }

    return compression.filter(req, res);
  }
}));

server.use(express.static('www', { maxAge: 3600000 }));

fs.copyFileSync('src/index.html', `dist/bundle/index.html`);

server.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/bundle/index.html'));
});

server.use('/', express.static(path.join(__dirname, '../dist/bundle')));

server.listen(8080, () => {
  console.log('Server listening to', 8080);
});
