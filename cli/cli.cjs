#!/usr/bin/env node

const { dirname, basename, join } = require('path');
const { version, bin } = require('../package.json');

// Get package name to use as namespace.
// Allows blueprints to be aliased.
const packagePath = dirname(__dirname);
const packageFolderName = basename(packagePath);
const devBlueprintPath = join(packagePath, '.blueprint');
const blueprint = packageFolderName.startsWith('jhipster-') ? `generator-${packageFolderName}` : packageFolderName;

(async () => {
  const { runJHipster, done, logger } = await import('generator-jhipster/cli');
  const executableName = Object.keys(bin)[0];
  const { printJHipsterLogo } = await import('../lib/print-jhipster-logo.js');

  runJHipster({
    executableName,
    executableVersion: version,
    defaultCommand: 'react-native',
    devBlueprintPath,
    blueprints: {
      [blueprint]: version,
    },
    printLogo: printJHipsterLogo,
    lookups: [{ packagePaths: [packagePath] }],
  }).catch(done);

  process.on('unhandledRejection', up => {
    logger.error('Unhandled promise rejection at:');
    logger.fatal(up);
  });
})();
