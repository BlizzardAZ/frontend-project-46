import { readFileSync } from 'node:fs'
import * as path from 'node:path'
import process from 'node:process'
import yaml from 'js-yaml'

const parseFile = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath)
  const data = readFileSync(absolutePath, 'utf-8')
  const fileExtension = path.extname(absolutePath).toLowerCase()

  switch (fileExtension) {
    case '.json':
      return JSON.parse(data)
    case '.yml':
    case '.yaml':
      return yaml.load(data)
    default:
      throw new Error(`Parsing of file ended incorrectly. File extension ${fileExtension} is not supported.`)
  }
}

export default parseFile
