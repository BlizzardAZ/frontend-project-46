import _ from 'lodash'

const generateDiffData = (obj1, obj2) => {
  const obj1Keys = Object.keys(obj1) // массив ключей
  const obj2Keys = Object.keys(obj2) // массив ключей
  const mergedKeys = _.union(obj1Keys, obj2Keys)
  const sortedMergedKeys = _.sortBy(mergedKeys)

  const diffData = sortedMergedKeys.map((key) => {
    if (!Object.hasOwn(obj1, key)) {
      return {
        key, // =key:key
        type: 'added',
        value: obj2[key],
      }
    }

    if (!Object.hasOwn(obj2, key)) {
      return {
        key,
        type: 'deleted',
        value: obj1[key],
      }
    }

    const value1 = obj1[key]
    const value2 = obj2[key]

    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return {
        key,
        type: 'nested',
        children: generateDiffData(value1, value2),
      }
    }

    if (Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key) && _.isEqual(obj1[key], obj2[key])) {
      return {
        key: key,
        type: 'unchanged',
        value: obj1[key],
      }
    }

    if (Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key) && !_.isEqual(obj1[key], obj2[key])) {
      return {
        key,
        type: 'changed',
        oldValue: obj1[key],
        newValue: obj2[key],
      }
    }
  })
  return diffData
}
export default generateDiffData
