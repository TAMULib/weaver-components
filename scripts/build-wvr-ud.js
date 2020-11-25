#!/usr/bin/env node
const process = require('process');
const fs = require('fs-extra');
const path = require('path');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const glob = require("glob");
const concat = require('concat');
const packageJson = require(`${process.cwd()}/package.json`);
const chalk = require('chalk');
require('console-stamp')(console, {
  format: ':date(HH:MM:ss)'
} );
const log = console.log;

const startTime = new Date();

const NM_WVR_UD_DIR = `${process.cwd()}/node_modules/@wvr/elements/.wvr-ud`;
const NM_UD_STATIC_ASSETS_DIR = `${NM_WVR_UD_DIR}/static-assets`;
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
const EXAMPLE_PATTERN = "ud-examples.html";
const SCRIPT_PATTERN = ".js";
const examples = [];
CONFIG.includes.forEach(i=>{
  log(`    ${chalk.blue('Inspecting '+i)}:`);
  let files = glob.sync(`${process.cwd()}/${i}`, {});
  files.forEach(f => {
    if(f.includes(EXAMPLE_PATTERN)) {
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
  const componentPath = e.replace(EXAMPLE_PATTERN,'ts');
  const templatePath = e.replace(EXAMPLE_PATTERN, 'html');
  const stylesPath = e.replace(EXAMPLE_PATTERN,'scss');
  const pathParts = e.split('/');
  const exampleName = pathParts[pathParts.length-1];
  const componentName = pathParts[pathParts.length-2];
  let exampleContent = fs.readFileSync(e, 'utf8');
  let componentSource = fs.readFileSync(componentPath, 'utf8');
  let {document} = (new JSDOM(exampleContent)).window;
  let componentSourceElement = document.createElement('component-source');
  componentSourceElement.innerHTML = componentSource;
  let templateSource = fs.existsSync(templatePath) ?  fs.readFileSync(templatePath, 'utf8') : 'No Template Found.';
  let templateElement = document.createElement('component-template');
  templateElement.innerHTML = templateSource;
  let stylesSource = fs.existsSync(templatePath) ? fs.readFileSync(stylesPath, 'utf8') : 'No Styles Found.';
  let componentScssElement = document.createElement('component-scss');
  componentScssElement.innerHTML = stylesSource;
  document.querySelectorAll('example').forEach(ex=>{
    ex.appendChild(componentSourceElement.cloneNode(true));
    ex.appendChild(templateElement.cloneNode(true));
    ex.appendChild(componentScssElement.cloneNode(true));
  });
  fs.writeFileSync(`${exaplestDest}/${exampleName}`, document.body.innerHTML);
  exampleManifest[componentName] = `${CONFIG.basePath}examples/${exampleName}`;
});

log(`    ${chalk.cyanBright('Total Example Docs')}: ${chalk.blue(Object.keys(exampleManifest).length)}`);

// Add additional scripts
log(`    ${chalk.green('Identifying Additional Scripts:')}`);
const additionalScripts = [];
CONFIG.additionalScript.forEach(i=>{
  log(`    ${chalk.blue('Inspecting '+i)}:`);
  let scripts = glob.sync(`${process.cwd()}/${i}`, {});
  scripts.forEach(s => {
    if(s.includes(SCRIPT_PATTERN)) {
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
  log(`${CONFIG.output}/assets/${fileName}`);
  if(fs.lstatSync(a).isDirectory()) {
    copyFolderSync(a, `${CONFIG.output}/assets/${fileName}`);
  } else {
    fs.copyFileSync(a, `${CONFIG.output}/assets/${fileName}`);
  }
});
log(`    ${chalk.cyanBright('Total Additional Assets')}: ${chalk.blue(additionalAssets.length)}`);

log(`    ${chalk.green('Including Static Content:')}`);


const stlyeFiles = [];

if(fs.existsSync(`${NM_UD_STATIC_ASSETS_DIR}/_styles.css`)) {
  stlyeFiles.push(`${NM_UD_STATIC_ASSETS_DIR}/_styles.css`);
};

if(fs.existsSync(`${WVR_UD_STATIC_ASSETS_DIR}/_styles.css`)) {
  stlyeFiles.push(`${WVR_UD_STATIC_ASSETS_DIR}/_styles.css`);
};

if(fs.existsSync(`${WVR_UD_STATIC_ASSETS_DIR}/overrides.css`)) {
  stlyeFiles.push(`${WVR_UD_STATIC_ASSETS_DIR}/overrides.css`);
};

concat(stlyeFiles, `${WVR_UD_STATIC_ASSETS_DIR}/styles.css`).finally(() => {
  const staticAssets = glob.sync(`${WVR_UD_STATIC_ASSETS_DIR}/**/*`, {});
  staticAssets.forEach(sa=>{
    log(`    ${chalk.cyan('- Including:     '+sa)}`);
    let saPathParts = sa.split('/');
    let fileName = saPathParts[saPathParts.length-1];
    if(fs.lstatSync(sa).isDirectory()) {
      copyFolderSync(sa, `${CONFIG.output}/${fileName}`);
    } else {
      if (sa.indexOf('static-assets/wud.js') > -1) {
        const localWud = `${WVR_UD_DIR}/static-assets/wud.js`;
        const nmWud = `${NM_WVR_UD_DIR}/static-assets/wud.js`;

        if (fs.existsSync(localWud)) {
          fs.copyFileSync(localWud, `${CONFIG.output}/${fileName}`);
        } else {
          fs.copyFileSync(nmWud, `${CONFIG.output}/${fileName}`);
        }
      } else {
        fs.copyFileSync(sa, `${CONFIG.output}/${fileName}`);
      }
    }
  });

  log(`    ${chalk.cyanBright('Total content')}: ${chalk.blue(staticAssets.length)}`);

  // Prepare Index
  log(`    ${chalk.green('Parsing Index Template:')}`);
  log(`    ${chalk.cyan('- Parsing:     index-base.html')}`);
  const localIndexBase = `${WVR_UD_DIR}/static-assets/index-base.html`;
  const nmIndexBase = `${NM_WVR_UD_DIR}/static-assets/index-base.html`;
  let content = fs.existsSync(localIndexBase) ?
                fs.readFileSync(localIndexBase, 'utf8') :
                fs.readFileSync(nmIndexBase, 'utf8');
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

});

function copyFolderSync(from, to) {
  fs.mkdirSync(to);
  fs.readdirSync(from).forEach(element => {
      if (fs.lstatSync(path.join(from, element)).isFile()) {
          fs.copyFileSync(path.join(from, element), path.join(to, element));
      } else {
          copyFolderSync(path.join(from, element), path.join(to, element));
      }
  });
}
