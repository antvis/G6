#!/usr/bin/env node
const shelljs = require('shelljs');
const version = require('../src/version');
const exec = shelljs.exec;
exec('tnpm sync && antv-bin upload -n @antv/g6 -v ' + version);
