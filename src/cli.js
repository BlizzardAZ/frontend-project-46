import { Command } from 'commander'

const program = new Command()

program
    .name('gendiff') 
    .description(`Compares two configuration files and shows a difference.`)
    .version('1.0.0') 

// program
//     .argument('<filepath1>', 'Path to first file')
//     .argument('<filepath2>', 'Path to second file');
// .arguments('<filepath1> <filepath2>')
    
export { program }