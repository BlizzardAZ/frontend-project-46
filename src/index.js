// точка входа
import parseFile from './modules/parsers.js'
import formatStylish from './formatters/stylishFormat.js'
import generateDiffData from './modules/generateDiffData.js'

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const obj1 = parseFile(filepath1)
  const obj2 = parseFile(filepath2)

  const diffAST = generateDiffData(obj1, obj2)

  switch (format) {
    case 'stylish':
      return formatStylish(diffAST)
    default:
      throw new Error(`Unknown format: '${format}'!`)
  }
}

export default genDiff
