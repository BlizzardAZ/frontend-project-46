const formattedOutput = (diff) => {
  const lines = ['{']

  Object.keys(diff).forEach((key) => {
    const value = diff[key]
    lines.push(`  ${key}: ${value}`)
  })

  lines.push('}')
  return lines.join('\n')
}

export default formattedOutput
