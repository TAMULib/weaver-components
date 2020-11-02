#!/usr/bin/env node

const fs = require('fs-extra');
const readline = require('readline');

const readInterface = readline.createInterface({
  input: fs.createReadStream('./defaults.env')
});

const configTemplate = {}; 
readInterface.on('line', line => {
  if (line[0] && line[0] !== '#') {
    const lineParts = line.split('=');
    const key = lineParts[0];
    const value = `$${key}`;
    configTemplate[snakeToCamelCase(key)] = value;
  }
});

readInterface.on('close', () => {
  fs.writeFile('./src/config-template.json', JSON.stringify(configTemplate));
});

const snakeToCamelCase = (snakeCaseString) => {
  let camelCaseString = '';
  snakeCaseString = snakeCaseString.toLowerCase();
  snakeCaseParts = snakeCaseString.split('_');

  camelCaseString += snakeCaseParts.shift();

  snakeCaseParts.forEach(snakeCasePart => {
    const nextCamelCasePart = snakeCasePart.charAt(0).toUpperCase() + snakeCasePart.slice(1);
    camelCaseString += nextCamelCasePart;
  });

  return camelCaseString;
}
