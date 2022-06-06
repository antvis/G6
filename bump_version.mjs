// Increases the version number in all package.json files and updates dependency references.
import {
  existsSync,
  readdirSync,
  readFileSync,
  statSync,
  writeFileSync
} from 'fs';
import { join } from 'path';
import * as semver from 'semver';

const newVersions = {};

function log(message) {
  process.stdout.write(`${message}\n`);
}

log("Bumping package versions");
for (const path of readdirSync('./packages')) {
  const packagePath = join('./packages', path, 'package.json');
  log(`Extracting version from ${packagePath}.`);
  if (existsSync(packagePath)) {
    const packageInfo = JSON.parse(readFileSync(packagePath));
    const currentSemver = semver.parse(packageInfo.version);
    let newVersion;
    if (currentSemver.prerelease.length === 0) {
      newVersion = currentSemver.version + '-siren.0';
    } else {
      newVersion = semver.inc(currentSemver, 'prerelease', 'siren');
    }
    newVersions[packageInfo.name] = newVersion;
    packageInfo.version = newVersion;
    log(`Bumping version in ${packagePath}.`);
    writeFileSync(packagePath, JSON.stringify(packageInfo, null, 2), 'utf-8');
  }
}

log("Updating dependencies");
for (const path of readdirSync('./packages')) {
  const packagePath = join('./packages', path, 'package.json');
  log(`Updating dependencies in ${packagePath}.`);
  if (existsSync(packagePath)) {
    const packageInfo = JSON.parse(readFileSync(packagePath));
    for (const section of ['dependencies', 'devDependencies', 'peerDependencies']) {
      for (const dependency of Object.keys(packageInfo[section] || [])) {
        if (newVersions[dependency]) {
          packageInfo[section][dependency] = newVersions[dependency];
        }
      }
    }
    writeFileSync(packagePath, JSON.stringify(packageInfo, null, 2), 'utf-8');
  }
}
