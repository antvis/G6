import { readFileSync, writeFileSync } from 'fs';

const pkg = readFileSync('./package.json', 'utf-8');
const version = JSON.parse(pkg).version;
writeFileSync('./src/version.ts', `export const version = '${version}';\n`, 'utf-8');
