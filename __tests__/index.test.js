import genDiff from '../src/index.js'
import * as path from 'node:path'
import process from 'node:process'
import { readFileSync } from 'node:fs'
import parseFile from '../src/parsers.js'
import yaml from 'js-yaml'
// import { strict as assert } from 'node:assert'
// import assert from 'power-assert'

const fixturePath = filename => path.resolve(process.cwd(), '__fixtures__', filename)

test('Compare two JSON files.Main functionality.Positive test', () => {
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

  expect(result).toEqual('{\n}')
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

test('Compare two YAML files. Main functionality.Positive test', () => {
  const filePath1 = fixturePath('file1.yaml')
  const filePath2 = fixturePath('file2.yaml')
  const result = genDiff(filePath1, filePath2)

  const resultCompareTo = readFileSync(fixturePath('expectedOutputPositive.json'), 'utf-8')
  expect(result).toEqual(resultCompareTo)
})

test('Compare two YAML files. Main functionality.Negative test', () => {
  const filePath1 = fixturePath('file1.yaml')
  const filePath2 = fixturePath('file2.yaml')
  const result = genDiff(filePath1, filePath2)

  const resultCompareTo = readFileSync(fixturePath('expectedOutputNegative.json'), 'utf-8')
  expect(result).not.toEqual(resultCompareTo)
})

test('Parse JSON file', () => {
  const filepath = fixturePath('file1.json')
  const parsedFile = JSON.parse(readFileSync(fixturePath('file1.json'), 'utf-8'))

  expect(parseFile(filepath)).toEqual(parsedFile)
})

test('Parse YAML file', () => {
  const filepath = fixturePath('file1.yaml')
  const parsedFile = yaml.load(readFileSync(fixturePath('file1.yaml'), 'utf-8'))

  expect(parseFile(filepath)).toEqual(parsedFile)
})

test('Parse file with unsupported ext. Throw error', () => {
  const unsupportedFilePath = fixturePath('unsupportedExtFile.txt')

  expect(() => {
    parseFile(unsupportedFilePath)
  }).toThrow(`File extension .txt is not supported`)
})

test('Parse invalid JSON file. Throw error', () => {
  const filepath = fixturePath('invalidJsonFile.json')

  expect(() => {
    parseFile(filepath)
  }).toThrow('Parsing of file ended incorrectly')
})

test('Parse invalid YAML file. Throw error', () => {
  const filepath = fixturePath('invalidYamlFile.yaml')

  expect(() => {
    parseFile(filepath)
  }).toThrow('Parsing of file ended incorrectly')
})
