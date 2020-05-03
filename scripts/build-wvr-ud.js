#!/usr/bin/env

const process = require('process');
const fs = require('fs-extra');
const glob = require("glob");
const concat = require('concat');

const wrvUDdir = `${process.cwd()}/.wvr-ud`;

const config = require(`${wrvUDdir}/config.json`);


// Get Example Locations
const EXAMPLE_PATTER = "ud-examples.html";
const examples = [];
config.includes.forEach(i=>{
  let files = glob.sync(`${process.cwd()}/${i}`, {});
  files.forEach(f => {
    if(f.includes(EXAMPLE_PATTER)) {
      examples.push(f);
    }
  });
});

// Write Examples
const exampleManifest = {};
const exaplestDest = `${config.output}/examples`;
fs.ensureDirSync(exaplestDest);
examples.forEach(e=>{
  const pathParts = e.split('/');
  const exampleName = pathParts[pathParts.length-1];
  const componentName = pathParts[pathParts.length-2];
  fs.copySync(e, `${exaplestDest}/${exampleName}`);
  exampleManifest[componentName] = `usage/examples/${exampleName}`;
});

fs.writeJSONSync(`${config.output}/examples/manifest.json`, exampleManifest);

concat(config.additionalScript, `${config.output}/additional-scripts.js`);

// Prepare Index
var content = fs.readFileSync(`${wrvUDdir}/static-assets/index-base.html`, 'utf8');

content = content.replace('{{manifest}}', JSON.stringify(exampleManifest));
fs.ensureDirSync(config.output);
fs.writeFileSync(`${config.output}/index.html`, content);
