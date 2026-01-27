#!/usr/bin/env node
import { Command } from 'commander'
import parseFile from '../src/parse.js'
import findDiff from '../src/findDifference.js'

const program = new Command()

program
  .name('gendiff')
  .description(`Compares two configuration files and shows a difference.`)
  .version('1.0.0')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2) => { // (filepath1, filepath2 options)
    const obj1 = parseFile(filepath1)
    // console.log('Из файла gendiff.js: ', obj1);
    const obj2 = parseFile(filepath2)
    // console.log('Из файла gendiff.js: ', obj2);

    const resultOfComparison = findDiff(obj1, obj2) // (obj1, obj2, options.format);
    const resultJsonSring = JSON.stringify(resultOfComparison, null, 2)

    console.log(resultJsonSring)
  })

program.parse(process.argv)

export { program }
