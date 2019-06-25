#!/usr/bin/env node

const yargs = require("yargs");

yargs
  // Commands are loaded from the /commands directory
  .commandDir('./commands')
  .demandCommand()
  .help()
  .alias('help', 'h')
  .argv;
