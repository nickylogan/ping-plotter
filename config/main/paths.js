'use strict';

const fs = require('fs');
const path = require('path');

const appDirectory = fs.realpathSync(process.cwd());

const moduleFileExtensions = [
  'web.mjs',
  'mjs',
  'web.js',
  'js',
  'web.ts',
  'ts',
  'json',
];

// Resolve file paths in the same order as webpack
const resolveModule = (resolveFn, filePath) => {
  const extension = moduleFileExtensions.find(extension =>
    fs.existsSync(resolveFn(`${filePath}.${extension}`))
  );

  if (extension) {
    return resolveFn(`${filePath}.${extension}`);
  }

  return resolveFn(`${filePath}.js`);
};

const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

module.exports = {
  appBuild: resolveApp('build/main'),
  appSrc: resolveApp('src/main'),
  appTsConfig: resolveApp('src/main/tsconfig.json'),
  appIndexJs: resolveModule(resolveApp, 'src/main/index'),
};
