#!/usr/bin/env

const process = require('process');
const fs = require('fs-extra');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const glob = require("glob");
const concat = require('concat');
const packageJson = require(`${process.cwd()}/package.json`);
const chalk = require('chalk');
const log = console.log;
require('console-stamp')(log, { 
  format: ':date(HH:MM:ss.l)' 
} );

const startTime = new Date();

const WVR_UD_DIR = `${process.cwd()}/.wvr-ud`;
const WVR_UD_STATIC_ASSETS_DIR = `${WVR_UD_DIR}/static-assets`;
const CONFIG = require(`${WVR_UD_DIR}/config.json`);

if (fs.existsSync(`${process.cwd()}/${CONFIG.output}`)) {
  fs.removeSync(`${process.cwd()}/${CONFIG.output}`)
  log(`    ${chalk.yellow('Cleaning Stale Builds...')}`);
} else {
  log(`    ${chalk.yellow('Clean Build...')}`);
}

log(`    ${chalk.green('Building Usage Documentation for:')} ${chalk.blue(`${packageJson.name} ${packageJson.version}`)}`);

// Get Example Locations
log(`    ${chalk.green('Identifying Examples')}:`);
const EXAMPLE_PATTER = "ud-examples.html";
const SCRIPT_PATTER = ".js";
const examples = [];
CONFIG.includes.forEach(i=>{
  log(`    ${chalk.blue('Inspecting '+i)}:`);
  let files = glob.sync(`${process.cwd()}/${i}`, {});
  files.forEach(f => {
    if(f.includes(EXAMPLE_PATTER)) {
      log(`    ${chalk.cyan('- Including:     '+f)}:`);
      examples.push(f);
    }
  });
});

// Write Examples
const exampleManifest = {};
const exaplestDest = `${CONFIG.output}/examples`;
fs.ensureDirSync(exaplestDest);
examples.forEach(e=>{
  const componentPath = e.replace(EXAMPLE_PATTER,'ts');
  const stylesPath = e.replace(EXAMPLE_PATTER,'scss');
  const pathParts = e.split('/');
  const exampleName = pathParts[pathParts.length-1];
  const componentName = pathParts[pathParts.length-2];
  let exampleContent = fs.readFileSync(e, 'utf8');
  let componentSource = fs.readFileSync(componentPath, 'utf8');
  let {document} = (new JSDOM(exampleContent)).window;
  let componentSourceElement = document.createElement('component-source');
  componentSourceElement.innerHTML = componentSource;
  let stylesSource = fs.readFileSync(stylesPath, 'utf8');
  let componentScssElement = document.createElement('component-scss');
  componentScssElement.innerHTML = stylesSource;
  document.querySelectorAll('example').forEach(ex=>{
    console.log(ex);
    ex.appendChild(componentSourceElement.cloneNode(true));
    ex.appendChild(componentScssElement.cloneNode(true));
  });
  fs.writeFileSync(`${exaplestDest}/${exampleName}`, document.body.innerHTML);
  exampleManifest[componentName] = `usage/examples/${exampleName}`;
});

log(`    ${chalk.cyanBright('Total Example Docs')}: ${chalk.blue(Object.keys(exampleManifest).length)}`);

// Add additional scripts
log(`    ${chalk.green('Identifying Additional Scripts:')}`);
const additionalScripts = [];
CONFIG.additionalScript.forEach(i=>{
  log(`    ${chalk.blue('Inspecting '+i)}:`);
  let scripts = glob.sync(`${process.cwd()}/${i}`, {});
  scripts.forEach(s => {
    if(s.includes(SCRIPT_PATTER)) {
      log(`    ${chalk.cyan('- Including:     '+s)}`);
      additionalScripts.push(s);
    }
  });
});
log(`    ${chalk.cyanBright('Total Additional Scripts')}: ${chalk.blue(additionalScripts.length)}`);
concat(additionalScripts, `${CONFIG.output}/additional-scripts.js`);


// Add additional assets
log(`    ${chalk.green('Identifying Additional Assets:')}`);
let additionalAssets = [];
CONFIG.additionalAssets.forEach(i=>{
  log(`    ${chalk.blue('Inspecting '+i)}:`);
  let assets = glob.sync(`${process.cwd()}/${i}`, {});
  additionalAssets = additionalAssets.concat(assets);
});
fs.ensureDirSync(`${CONFIG.output}/assets`);
additionalAssets.forEach(a=>{
  log(`    ${chalk.cyan('- Including:     '+a)}`);
  let aPathParts = a.split('/');
  let fileName = aPathParts[aPathParts.length-1];
  fs.copyFileSync(a, `${CONFIG.output}/assets/${fileName}`);
}); 
log(`    ${chalk.cyanBright('Total Additional Assets')}: ${chalk.blue(additionalAssets.length)}`);

log(`    ${chalk.green('Including Static Content:')}`);
let staticAssets = glob.sync(`${WVR_UD_STATIC_ASSETS_DIR}/**/*`, {});
staticAssets.forEach(sa=>{
  log(`    ${chalk.cyan('- Including:     '+sa)}`);
  let saPathParts = sa.split('/');
  let fileName = saPathParts[saPathParts.length-1];
  fs.copyFileSync(sa, `${CONFIG.output}/${fileName}`);
});

log(`    ${chalk.cyanBright('Total content')}: ${chalk.blue(staticAssets.length)}`);

// Prepare Index
log(`    ${chalk.green('Parsing Index Template:')}`);
log(`    ${chalk.cyan('- Parsing:     index-base.html')}`);
let content = fs.readFileSync(`${WVR_UD_DIR}/static-assets/index-base.html`, 'utf8');
content = content.replace('{{EXAMPLE_MANIFEST}}', JSON.stringify(exampleManifest));
content = content.replace(/{{PROJECT_NAME}}/g, `${packageJson.name} ${packageJson.version}`);
content = content.replace(/{{BASE_PATH}}/g, CONFIG.basePath);
fs.ensureDirSync(CONFIG.output);
fs.writeFileSync(`${CONFIG.output}/index.html`, content);
log(`    ${chalk.cyanBright('Finished Parsing Index Template')}`);

const endTime = new Date();
let timeDiff = endTime - startTime; //in ms
timeDiff /= 1000;

log(`    ${chalk.green('Usage Documentation Finished:')} ${chalk.blue(timeDiff+'s')}`);
