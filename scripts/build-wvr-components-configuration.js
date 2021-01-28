#!/usr/bin/env node

const dotEnv = require('dotenv-override-true');
const fs = require('fs-extra');

let defaults = dotEnv.config({
  path: `${process.cwd()}/defaults.env`
});

if(process.argv[2]) {
  defaults = dotEnv.config({
    path: `${process.cwd()}/${process.argv[2]}`
  });
}

let configTemplate = fs.readFileSync('./src/config-template.json', 'utf8');

Object.keys(defaults.parsed)
  .forEach(key => {
    configTemplate = configTemplate.replace(`$${key}`, defaults.parsed[key])
  });

if(fs.existsSync('./dist')) {
  fs.writeFile('./dist/bundle/config.json', configTemplate);
}

if(fs.existsSync('./static')) {
  fs.writeFile('./static/config.json', configTemplate);

  fs.copy('./static/config.json', './static/weaver-components/config.json', err => {
    if (err) return console.error('Could not copy config file to static/weaver-components', err);
    console.log('Copied config file to static/weaver-components successfully');
  });

  fs.copy('./static/config.json', './static/weaver-components/docs/config.json', err => {
    if (err) return console.error('Could not copy config file to static/weaver-components/docs', err);
    console.log('Copied config file to static/weaver-components/docs successfully');
  });

  fs.copy('./static/config.json', './static/weaver-components/docs/usage/config.json', err => {
    if (err) return console.error('Could not copy config file to static/weaver-components/docs/usage path', err);
    console.log('Copied config file to static/weaver-components/docs/usage successfully');
  });

  fs.copy('./static/config.json', './static/weaver-components/docs/usage/assets/config.json', err => {
    if (err) return console.error('Could not copy config file to static/weaver-components/docs/usage/assets path', err);
    console.log('Copied config file to static/weaver-components/docs/usage/assets successfully');
  });
}

fs.writeFile('./src/config.json', configTemplate);
