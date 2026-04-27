// Выбор форматеров реализуйте в файле formatters/index.js.

import formatStylish from './stylishFormat.js'
import formatPlain from './plainFormat.js'
import formatJSON from './JSONFormat.js'

const getFormatter = (diffAST, formatName) => {
  switch (formatName.toLowerCase()) {
    case 'stylish':
      return formatStylish(diffAST)
    case 'plain':
      return formatPlain(diffAST)
    case 'json':
      return formatJSON(diffAST)
    default:
      throw new Error(`Unknown format: '${formatName}'!`)
  }
}

export default getFormatter
