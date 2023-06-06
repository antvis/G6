#!/usr/bin/env node
const path = require('path');
const shelljs = require('shelljs');

const src = path.join(process.cwd(), './build/*.js');
const dist = path.join(process.cwd(), './dist');
shelljs.cp(src, dist);
