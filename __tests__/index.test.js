import genDiff from '../src/index.js'
import * as path from 'node:path'
import process from 'node:process'
import * as fs from 'node:fs'
import parseFile from '../src/modules/parsers.js'
import yaml from 'js-yaml'

// Helpers for getting filepath
const getFixturePath = filename => path.resolve(process.cwd(), '__fixtures__', filename)
const readFile = filename => fs.readFileSync(getFixturePath(filename), 'utf-8')

// Test data
const filesForTest = [
  ['file1.json', 'file2.json', 'expectedOutputPositiveNested.txt'],
  ['file1.yaml', 'file2.yaml', 'expectedOutputPositiveNested.txt'],
  ['file1.json', 'file2.yaml', 'expectedOutputPositiveNested.txt'],
  ['filesEqual1.json', 'filesEqual2.json', 'comparisonResultBothEqual.txt'],
  ['fileEmpty1.json', 'fileEmpty2.json', 'emptyResult.txt'],
  ['emptyFile.json', 'plainFile2.json', 'comparisonResultFirstEmptySecondNot.txt'],
  ['plainFile1.json', 'emptyFile.json', 'comparisonResultFirstNotEmptySecondEmpty.txt'],
]

test.each(filesForTest)('compare files %s and %s, result should be equal %s', (file1, file2, expectedFile) => {
  const result = genDiff(getFixturePath(file1), getFixturePath(file2))
  const resultCompareTo = readFile(expectedFile)
  expect(result).toBe(resultCompareTo.trim())
})

// Parsers
const formats = [
  ['plainFile1.json', JSON.parse],
  ['plainFile1.yaml', yaml.load],
]

test.each(formats)('parse %s file correctly', (filename, parser) => {
  const filepath = getFixturePath(filename)
  const fileContent = readFile(filename)

  expect(parseFile(filepath)).toEqual(parser(fileContent))
})

const unsupportedFilesANdErrors = [
  ['unsupportedExtFile.txt', 'File extension .txt is not supported'],
  ['invalidJsonFile.json', 'Parsing of file ended incorrectly'],
  ['invalidYamlFile.yaml', 'Parsing of file ended incorrectly'],
]

test.each(unsupportedFilesANdErrors)('parse unsupported extension file %s, throw error', (filename, error) => {
  const unsupportedData = getFixturePath(filename)

  expect(() => parseFile(unsupportedData)).toThrow(error)
})
