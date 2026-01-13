import { readFileSync } from 'fs';
const { path } = require('node:path');
const { cwd } = require('node:process');

const parseFile = (filepath) => {
    const absolutePath = path.resolve(process.cwd(), filepath)

    const data = readFileSync(absolutePath, 'utf-8');

    const fileExt = path.extname(absolutePath).toLowerCase()

    switch (fileExt) {
        case '.json':
          return JSON.parse(data);
        // case '.yaml':
        //     return yaml.load(data);
        // case '.yml':
        //   return yaml.load(data);
        // default:
        //   throw new Error(`Неподдерживаемый формат файла: ${ext}`);
      }

}

export default parseFile;