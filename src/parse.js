import { readFileSync } from 'fs'
import * as path from 'node:path'
import process from 'node:process'

const parseFile = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), '__fixtures__', filepath)

  const data = readFileSync(absolutePath, 'utf-8') // вернет строку со всем содерж в utf-8
  // console.log('Из файла parse.js: ', data);

  const fileExt = path.extname(absolutePath).toLowerCase()

  if (fileExt === '.json') {
    return JSON.parse(data) // вернет объект //НЕПОКРЫТО ТЕСТАМИ!!!
  }
}

export default parseFile
