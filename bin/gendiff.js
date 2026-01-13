#!/usr/bin/env node
import { Command } from 'commander';
import { parseFile } from '../src/parse.js';
import { findDiff} from '../src/findDifference.js'

const program = new Command();

program
    .name('gendiff') 
    .description(`Compares two configuration files and shows a difference.`)
    .version('1.0.0') 
    .arguments('<filepath1> <filepath2>')
    .option('-f, --format [type]', 'output format')
    .action((filepath1, filepath2, options) => {
        const data1 = parseFile(filepath1);
        const data2 = parseFile(filepath2);

        const resultOfComparison = findDiff(data1, data2, options.format);

        return resultOfComparison;
    })

program.parse(process.argv)
    
export { program }