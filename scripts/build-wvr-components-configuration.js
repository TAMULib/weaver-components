const dotEnv = require('dotenv-override-true');
const { exec } = require('child_process');
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

fs.writeFile('./dist/bundle/1x/config.json', configTemplate);
fs.writeFile('./dist/bundle/latest/config.json', configTemplate);
fs.writeFile('./static/weaver-components/docs/usage/config.json', configTemplate);
fs.writeFile('./src/config.json', configTemplate);
