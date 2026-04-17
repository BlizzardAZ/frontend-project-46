import _ from 'lodash'

const formatStylish = (tree) => {
  const stringify = (value, depth) => {
    if (!_.isPlainObject(value)) {
      return String(value)
    }

    const space = ' '
    const indentSize = depth * 4

    const currentIndent = space.repeat(indentSize + 4)
    const bracketIndent = space.repeat(indentSize)

    const lines = Object.entries(value).map(
      ([key, val]) => `${currentIndent}${key}: ${stringify(val, depth + 1)}`,
    )
    return ['{', ...lines, `${bracketIndent}}`].join('\n')
  }

  const iter = (nodes, depth) => {
    const space = ' '
    const indentSize = depth * 4
    const signIndent = space.repeat(indentSize - 2) // Отступ для знака
    const bracketIndent = space.repeat(indentSize - 4)

    const lines = nodes.map((node) => {
      switch (node.type) {
        case 'added':
          return `${signIndent}+ ${node.key}: ${stringify(node.value, depth)}`
        case 'deleted':
          return `${signIndent}- ${node.key}: ${stringify(node.value, depth)}`
        case 'changed':
          return [
            `${signIndent}- ${node.key}: ${stringify(node.oldValue, depth)}`,
            `${signIndent}+ ${node.key}: ${stringify(node.newValue, depth)}`,
          ].join('\n')
        case 'unchanged':
          return `${signIndent}  ${node.key}: ${stringify(node.value, depth)}`
        case 'nested':
          return `${signIndent}  ${node.key}: ${iter(node.children, depth + 1)}`
        default:
          throw new Error(`Unknown type: ${node.type}`)
      }
    })
    return ['{', ...lines, `${bracketIndent}}`].join('\n')
  }
  return iter(tree, 1)
}

export default formatStylish
