#!/usr/bin/env node
const fs = require('fs-extra');
const handlebars = require('handlebars');
const themeVariants = require('../projects/wvr-elements/src/lib/shared/theme/default-theme');

const variablesTemplate = fs.readFileSync('src/_variables.scss.hbs');

const templateFn = handlebars.compile(variablesTemplate.toString(), { strict: true });

fs.writeFileSync('projects/wvr-elements/src/lib/shared/styles/_variables.scss', templateFn({themeVariants}));
