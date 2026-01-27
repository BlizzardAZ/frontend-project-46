import _ from 'lodash'

// (obj1, obj2, options.format)
const findDiff = (obj1, obj2) => {
  if (Object.keys(obj1).length === 0 || Object.keys(obj2).length === 0) {
    return 'Comparison is incorrect'
  }

  const obj1Keys = _.sortBy(Object.keys(obj1)) // массив ключей
  const obj2Keys = _.sortBy(Object.keys(obj2)) // массив ключей

  const allKeys = _.sortBy(_.union(obj1Keys, obj2Keys))

  const result = {}

  allKeys.forEach((key) => {
    const hasKey1 = obj1Keys.includes(key)
    const hasKey2 = obj2Keys.includes(key)
    const value1 = obj1[key]
    const value2 = obj2[key]

    if (hasKey1 && hasKey2 && value1 === value2) {
      result[`  ${key}`] = value1
    }
    else if (hasKey1 && hasKey2 && value1 !== value2) {
      result[`- ${key}`] = value1
      result[`+ ${key}`] = value2
    }

    if (hasKey1 && !hasKey2) {
      result[`- ${key}`] = value1
    }
    else if (!hasKey1 && hasKey2) {
      result[`+ ${key}`] = value2
    }
  })
  // console.log('Из файла findDifference.js: ', result);
  return result
}

export default findDiff
