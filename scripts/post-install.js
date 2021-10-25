#!/usr/bin/env node

const shell = require('shelljs');
const process = require('process');
const fs = require('fs-extra');

const NM_WVR_UD_DIR = `${process.cwd()}/node_modules/`;

if (fs.existsSync(NM_WVR_UD_DIR)) {
    shell.cd(NM_WVR_UD_DIR);
    shell.exec('sass-migrator division **/*.scss');
    shell.exit();
}
