// Выбор форматеров реализуйте в файле formatters/index.js.

import formatStylish from './stylishFormat.js'
import formatPlain from './plainFormat.js'

const getFormatter = (diffAST, formatName) => {
  switch (formatName) {
    case 'stylish':
      return formatStylish(diffAST)
    case 'plain':
      return formatPlain(diffAST)
    default:
      throw new Error(`Unknown format: '${formatName}'!`)
  }
}

export default getFormatter
