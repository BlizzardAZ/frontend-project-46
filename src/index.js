// точка входа
import parseFile from './parsers.js'
import findDiff from './findDifference.js'
import formattedOutput from './formatOutput.js'

const genDiff = (filepath1, filepath2) => {
  const obj1 = parseFile(filepath1)
  const obj2 = parseFile(filepath2)

  const diff = findDiff(obj1, obj2)

  return formattedOutput(diff)
}

export default genDiff
