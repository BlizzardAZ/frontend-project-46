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
  ['file1.json', 'file2.json', 'stylish', 'expectPositiveStylish.txt'],
  ['file1.yaml', 'file2.yaml', 'stylish', 'expectPositiveStylish.txt'],
  ['file1.yaml', 'file2.yml', 'stylish', 'expectPositiveStylish.txt'],
  ['file1.json', 'file2.yaml', 'stylish', 'expectPositiveStylish.txt'],
  ['filesEqual1.json', 'filesEqual2.json', 'stylish', 'expectBothEqualStylish.txt'],
  ['fileEmpty1.json', 'fileEmpty2.json', 'stylish', 'expectEmpty.txt'],
  ['fileEmpty1.json', 'file2.json', 'stylish', 'expectFirstEmptyStylish.txt'],
  ['file1.json', 'fileEmpty2.json', 'stylish', 'expectSecondEmptyStylish.txt'],
  ['file1.yaml', 'file2.yml', 'stylish', 'expectPositiveStylish.txt'],
  ['file1.json', 'file2.json', 'plain', 'expectPlain.txt'],
  ['file1.yaml', 'file2.yml', 'plain', 'expectPlain.txt'],
  ['file1.json', 'file2.yaml', 'plain', 'expectPlain.txt'],
  ['file1.json', 'file2.json', 'json', 'expectJson.json'],
]

test.each(filesForTest)('compare files %s and %s, formatter name %s, result should be equal %s', (file1, file2, formatName, expectedFile) => {
  const result = genDiff(getFixturePath(file1), getFixturePath(file2), formatName)
  const resultCompareTo = readFile(expectedFile)
  expect(result).toBe(resultCompareTo.trim())
})

// Parsers
const formats = [
  ['file1.json', JSON.parse],
  ['file1.yaml', yaml.load],
  ['file2.yml', yaml.load],
]

test.each(formats)('parse %s file correctly', (filename, parser) => {
  const filepath = getFixturePath(filename)
  const fileContent = readFile(filename)

  expect(parseFile(filepath)).toEqual(parser(fileContent))
})

test('to throw error for unsupported extension', () => {
  const path = getFixturePath('unsupportedExtFile.txt')
  expect(() => parseFile(path)).toThrow('Parsing of file ended incorrectly. File extension .txt is not supported.')
})

const invalidFiles = [
  ['invalidJsonFile.json'],
  ['invalidYamlFile.yaml'],
]

test.each(invalidFiles)('to throw error for invalid content in %s', (filename) => {
  const path = getFixturePath(filename)
  expect(() => parseFile(path)).toThrow()
})
