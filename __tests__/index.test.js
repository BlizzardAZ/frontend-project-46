import genDiff from '../src/index.js'
import * as path from 'node:path'
import process from 'node:process'
import { readFileSync } from 'fs'
// import { strict as assert } from 'node:assert'
// import assert from 'power-assert'

const fixturePath = filename => path.resolve(process.cwd(), '__fixtures__', filename)

test('Main functionality.Positive test', () => {
  const filePath1 = fixturePath('file1.json')
  const filePath2 = fixturePath('file2.json')
  const result = genDiff(filePath1, filePath2)

  const resultCompareTo = readFileSync(fixturePath('expectedOutputPositive.json'), 'utf-8')
  expect(result).toEqual(resultCompareTo)
})

test('Main functionality.Negative test', () => {
  const filePath1 = fixturePath('file1.json')
  const filePath2 = fixturePath('file2.json')
  const result = genDiff(filePath1, filePath2)

  const resultCompareTo = readFileSync(fixturePath('expectedOutputNegative.json'), 'utf-8')

  expect(result).not.toEqual(resultCompareTo)
})

test('Both files are empty', () => {
  const filePath1 = fixturePath('fileEmpty1.json')
  const filePath2 = fixturePath('fileEmpty2.json')
  const result = genDiff(filePath1, filePath2)

  expect(result).toEqual('{}')
})

test('First file empty / second not', () => {
  const filePath1 = fixturePath('fileEmpty1.json')
  const filePath2 = fixturePath('file2.json')
  const result = genDiff(filePath1, filePath2)

  const resultCompareTo = readFileSync(fixturePath('comparisonResultFirstEmptySecondNot.json'), 'utf-8')

  // console.log('Result:', result)
  // console.log('Expected:', resultCompareTo)

  expect(result).toEqual(resultCompareTo)
})

test('First file not empty / second empty', () => {
  const filePath1 = fixturePath('file1.json')
  const filePath2 = fixturePath('fileEmpty2.json')
  const result = genDiff(filePath1, filePath2)

  const resultCompareTo = readFileSync(fixturePath('comparisonResultFirstNotEmptySecondEmpty.json'), 'utf-8')

  // console.log('Result:', result)
  // console.log('Expected:', resultCompareTo)

  expect(result).toEqual(resultCompareTo)
})

test('Both files are equal', () => {
  const filePath1 = fixturePath('filesEqual1.json')
  const filePath2 = fixturePath('filesEqual2.json')
  const result = genDiff(filePath1, filePath2)

  const resultCompareTo = readFileSync(fixturePath('comparisonResultBothEqual.json'), 'utf-8')
  expect(result).toEqual(resultCompareTo)
})
