#!/usr/bin/env node

const dotEnv = require('dotenv-override-true');
const fs = require('fs-extra');

let defaults = dotEnv.config({
  path: `${process.cwd()}/defaults.env`
});

console.log('\n\n\n default config = ', defaults, '\n\n\n');

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

if(fs.existsSync('./static')) { console.log(' \n\n\n config file copied to static path', configTemplate, '\n\n\n');
  fs.writeFile('./static/config.json', configTemplate);
}

if(fs.existsSync('./weaver-components/docs')) { console.log(' \n\n\n config file copied to weaver-components docs path', configTemplate,  '\n\n\n');
  fs.writeFile('./weaver-components/docs/config.json', configTemplate);
}

if(fs.existsSync('./weaver-components/docs/assets')) { console.log(' \n\n\n config file copied to weaver-components docs assets path', configTemplate,  '\n\n\n');
  fs.writeFile('./weaver-components/docs/assets/config.json', configTemplate);
}

fs.writeFile('./src/config.json', configTemplate);
