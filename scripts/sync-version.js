#!/usr/bin/env node
// Sets "version" in package.json and package-lock.json from a branch named vX-Y-Z.
// Run by the .githooks/post-checkout hook, or by hand: `npm run sync-version`.
const { execSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const branch = execSync('git rev-parse --abbrev-ref HEAD', { cwd: root }).toString().trim();
const match = /^v(\d+)-(\d+)-(\d+)$/.exec(branch);

if (!match) {
  process.exit(0);
}

const version = match.slice(1).join('.');
const changed = [];

const update = (file, apply) => {
  const filePath = path.join(root, file);
  if (!fs.existsSync(filePath)) return;
  const json = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  if (!apply(json)) return;
  fs.writeFileSync(filePath, JSON.stringify(json, null, 2) + '\n');
  changed.push(file);
};

update('package.json', (pkg) => {
  if (pkg.version === version) return false;
  pkg.version = version;
  return true;
});

update('package-lock.json', (lock) => {
  const rootPkg = lock.packages && lock.packages[''];
  if (lock.version === version && (!rootPkg || rootPkg.version === version)) return false;
  lock.version = version;
  if (rootPkg) rootPkg.version = version;
  return true;
});

if (changed.length) {
  console.log(`sync-version: set version ${version} from branch "${branch}" in ${changed.join(', ')}`);
}
