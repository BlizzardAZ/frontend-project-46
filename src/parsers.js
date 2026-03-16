import { readFileSync } from 'fs'
import * as path from 'node:path'
import process from 'node:process'
import yaml from 'js-yaml'

const parseFile = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), '__fixtures__', filepath)

  const data = readFileSync(absolutePath, 'utf-8') // вернет строку со всем содерж в utf-8
  // console.log('Из файла parse.js: ', data);

  const fileExt = path.extname(absolutePath).toLowerCase()

  if (!['.json', '.yaml', '.yml'].includes(fileExt)) {
    throw new Error(`File extension ${fileExt} is not supported`)
  }

  try {
    if (fileExt === '.json') {
      return JSON.parse(data)
    }
    else if (fileExt === '.yml' || fileExt === '.yaml') {
      return yaml.load(data)
    }
  }
  catch (e) {
    console.error('Parsing error', e)
    throw new Error('Parsing of file ended incorrectly')
  }
}

export default parseFile
