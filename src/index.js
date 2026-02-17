// точка входа
import parseFile from './parse.js'
import findDiff from './findDifference.js'

const genDiff = (filepath1, filepath2) => {
  const obj1 = parseFile(filepath1)
  const obj2 = parseFile(filepath2)

  const diff = findDiff(obj1, obj2) // return {}
  return JSON.stringify(diff, null, 2) // convert {} to JSON str
}

export default genDiff
