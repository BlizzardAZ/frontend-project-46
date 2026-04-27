// точка входа
import parseFile from './modules/parsers.js'
import generateDiffData from './modules/generateDiffData.js'
import getFormatter from './formatters/index.js'

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const obj1 = parseFile(filepath1)
  const obj2 = parseFile(filepath2)

  const diffAST = generateDiffData(obj1, obj2)
  return getFormatter(diffAST, format)
}

export default genDiff
