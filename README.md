## Hexlet tests and linter status:
[![Actions Status](https://github.com/BlizzardAZ/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/BlizzardAZ/frontend-project-46/actions)

## SonarQube tests and tests-coverage:
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=BlizzardAZ_frontend-project-46&metric=coverage)](https://sonarcloud.io/summary/new_code?id=BlizzardAZ_frontend-project-46)
[![Quality gate](https://sonarcloud.io/api/project_badges/quality_gate?project=BlizzardAZ_frontend-project-46)](https://sonarcloud.io/summary/new_code?id=BlizzardAZ_frontend-project-46)
[![SonarQube Cloud](https://sonarcloud.io/images/project_badges/sonarcloud-light.svg)](https://sonarcloud.io/summary/new_code?id=BlizzardAZ_frontend-project-46)

# Difference Calculator / Вычислитель отличий (frontend-project-46)

**Difference Calculator** is a CLI utility that finds and displays the differences between two data structures.

**Features**:

- Supports various input formats: yaml, json

- Generates reports in multiple formats: plain text, stylish and json

## Setup

1. `make install` или `npm ci`

2. `npm link`

## Usage

`gendiff [options] <filepath1> <filepath2>`

Arguments:

`<filepath1> <filepath2>` - relative paths to the files being compared

Parameters:

`-v`, `--version` output the current version

`-f`, `--format [type]` output format (default: "stylish")

`-h`, `--help` display help for command

## Library usage examples:
[Example of "gendiff" package work](https://asciinema.org/a/xAHMEfM1jl3tMD5F)

[Example of "gendiff -h" work, comparison of two files with common or different extentions ('.json' / '.yaml', '.yml')](https://asciinema.org/a/AyqJQs3K97zDWW1g)

[Example of recursive comparison. Example of "Stylish" formatter work](https://asciinema.org/a/aGmLB2dGjMnpctiV)


