'use strict';

const fs = require('fs');
const path = require('path');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

module.exports = {
  appSrc: resolveApp("src/main"),
  appTsConfig: resolveApp("src/main/tsconfig.json"),
};
