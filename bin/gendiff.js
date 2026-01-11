#!/usr/bin/env node

import { program } from '../src/cli.js';
// import genDiff from '../index.js';

program.parse(process.argv)

// const [filepath1, filepath2] = program.args;

// const diff = genDiff(filepath1, filepath2);
// console.log(diff);