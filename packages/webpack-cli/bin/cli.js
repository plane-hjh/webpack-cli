#!/usr/bin/env node

'use strict';
require('v8-compile-cache');
const importLocal = require('import-local');
const runCLI = require('../lib/bootstrap');
const { yellow } = require('colorette');
const { error, info } = require('../lib/utils/logger');
const { packageExists, promptInstallation } = require('@webpack-cli/package-utils');

// Prefer the local installation of webpack-cli
if (importLocal(__filename)) {
    return;
}
process.title = 'webpack';

if (packageExists('webpack')) {
    const [, , ...rawArgs] = process.argv;
    runCLI(rawArgs);
} else {
    promptInstallation('webpack', () => {
        error(`It looks like ${yellow('webpack')} is not installed.`);
    })
        .then(() => info(`${yellow('webpack')} was installed sucessfully.`))
        .catch(() => {
            process.exitCode = 2;
            error(`Action Interrupted, Please try once again or install ${yellow('webpack')} manually.`);
        });
    return;
}
