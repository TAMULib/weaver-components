#!/usr/bin/env

const process = require('process');
const fs = require('fs-extra');
const glob = require("glob");
const concat = require('concat');
require('console-stamp')(console, { 
  format: ':date(HH:MM:ss.l)' 
} );
const chalk = require('chalk');
const log = console.log;

const startTime = new Date();

const wrvUDdir = `${process.cwd()}/.wvr-ud`;

const config = require(`${wrvUDdir}/config.json`);

log(`    ${chalk.green('Building Usage Documentation for:')} ${chalk.blue(config.projectName)}`);

// Get Example Locations
log(`    ${chalk.green('Identifying Examples:')}`);
const EXAMPLE_PATTER = "ud-examples.html";
const SCRIPT_PATTER = ".js";
const examples = [];
config.includes.forEach(i=>{
  log(`    ${chalk.blue('inspecting '+i)}:`);
  let files = glob.sync(`${process.cwd()}/${i}`, {});
  files.forEach(f => {
    if(f.includes(EXAMPLE_PATTER)) {
      log(`    ${chalk.cyan('- Found '+f)}:`);
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

log(`    ${chalk.green('Total Example Docs')}: ${chalk.blue(Object.keys(exampleManifest).length)}`);

// Add additional scripts
log(`    ${chalk.green('Identifying Additional Scripts:')}`);
const additionalScripts = [];
config.additionalScript.forEach(i=>{
  log(`    ${chalk.blue('inspecting '+i)}:`);
  let scripts = glob.sync(`${process.cwd()}/${i}`, {});
  scripts.forEach(s => {
    if(s.includes(SCRIPT_PATTER)) {
      log(`    ${chalk.cyan('- Found '+s)}:`);
      additionalScripts.push(s);
    }
  });
});
log(`    ${chalk.green('Total Additional Scripts')}: ${chalk.blue(additionalScripts.length)}`);
concat(additionalScripts, `${config.output}/additional-scripts.js`);


// Add additional assets
log(`    ${chalk.green('Identifying Additional Assets:')}`);
let additionalAssets = [];
config.additionalAssets.forEach(i=>{
  log(`    ${chalk.blue('inspecting '+i)}:`);
  let assets = glob.sync(`${process.cwd()}/${i}`, {});
  additionalAssets = additionalAssets.concat(assets);
});
fs.ensureDirSync(`${config.output}/assets`);
additionalAssets.forEach(a=>{
  log(`    ${chalk.cyan('- Moving '+a)}:`);
  let aPathParts = a.split('/');
  let fileName = aPathParts[aPathParts.length-1];
  fs.copyFile(a, `${config.output}/assets/${fileName}`)
}); 


// Prepare Index
log(`    ${chalk.blue('Writing index...')}`);
var content = fs.readFileSync(`${wrvUDdir}/static-assets/index-base.html`, 'utf8');
content = content.replace('{{manifest}}', JSON.stringify(exampleManifest));
content = content.replace(/{{projectName}}/g, config.projectName);
fs.ensureDirSync(config.output);
fs.writeFileSync(`${config.output}/index.html`, content);


const endTime = new Date();
let timeDiff = endTime - startTime; //in ms
timeDiff /= 1000;

log(`    ${chalk.green('Usage Documentation Finished:')} ${chalk.blue(timeDiff)}s`);
