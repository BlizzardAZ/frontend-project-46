import _ from 'lodash'

const formatValue = (value) => {
    if (_.isObject(value) && value !== null) {
        return '[complex value]'
    }
    if (typeof value === 'string') {
        return `'${value}'`
    }
    return (String(value))

}

const formatPlain = (diffAST) => {
    const iter = (nodes, path) => { //path = acc для формир пути, вызываем его пустым ''
        const lines = nodes
          .map((node) => {
            const currentPath = path === '' ? node.key : `${path}.${node.key}`

            switch(node.type) {
                case 'nested':
                    return iter(node.children, currentPath)
                case 'added':
                    return `Property '${currentPath}' was added with value: ${formatValue(node.value)}`
                case 'deleted':
                    return `Property '${currentPath}' was removed`
                case 'unchanged':
                    return null
                case 'changed':
                    return `Property '${currentPath}' was updated. From ${formatValue(node.oldValue)} to ${formatValue(node.newValue)}`
                default:
                    throw new Error(`Unknown node type: ${node.type}`)
            }   
        })
        const formattedLines = lines
          .filter(line => line !== null)
          .join('\n')
        
        return formattedLines
    }
    return iter(diffAST, '')
}

export default formatPlain



