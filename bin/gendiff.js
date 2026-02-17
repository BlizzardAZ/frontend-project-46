#!/usr/bin/env node
// CLI точка входа
import { Command } from 'commander'
import genDiff from '../src/index.js'

const program = new Command()

program
  .name('gendiff')
  .description(`Compares two configuration files and shows a difference.`)
  .version('1.0.0')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2) => { // (filepath1, filepath2, options)
    const diffStr = genDiff(filepath1, filepath2)
    console.log(diffStr)
  })

program.parse(process.argv)

export { program }
