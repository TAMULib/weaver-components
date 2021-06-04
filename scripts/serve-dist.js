#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const express = require('express');

const server = express();

server.use(express.static('www', { maxAge: 3600000 }));

fs.copyFileSync('src/index.html', `dist/bundle/index.html`);

server.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/bundle/index.html'));
});

server.use('/', express.static(path.join(__dirname, '../dist/bundle')));

server.listen(8080, () => {
  console.log('Server listening to', 8080);
});
