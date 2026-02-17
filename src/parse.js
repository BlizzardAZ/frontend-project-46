import { readFileSync } from 'fs'
import * as path from 'node:path'
import process from 'node:process'

const parseFile = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), '__fixtures__', filepath)
  // console.log('Из файла parse.js: ', absolutePath);

  const data = readFileSync(absolutePath, 'utf-8') // вернет строку со всем содерж в utf-8
  // console.log('Из файла parse.js: ', data);

  const fileExt = path.extname(absolutePath).toLowerCase()
  // console.log('Из файла parse.js: ', fileExt);

  if (fileExt === '.json') {
    return JSON.parse(data) // вернет объект //НЕПОКРЫТО ТЕСТАМИ!!!
  }

  // switch (fileExt) {
  //     case '.json':
  //       return JSON.parse(data); //вернулся обьект с ключ-знаечние
  //     // case '.yaml':
  //     //     return yaml.load(data);
  //     // case '.yml':
  //     //   return yaml.load(data);
  //     // default:
  //     //   throw new Error(`Неподдерживаемый формат файла: ${ext}`);
  //   }
}

export default parseFile
