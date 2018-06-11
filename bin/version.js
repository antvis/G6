#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const cPath = path.join(process.cwd(), './package.json');
const version = require('../src/version');
const pk = JSON.parse(fs.readFileSync(cPath, 'utf8'));
pk.version = version;

fs.writeFile(cPath, JSON.stringify(pk, null, '  '), function(err) {
  if (err) {
    return console.error(err);
  }
});
