function normalize(value) {
  return value.trim().toLowerCase()
}

export function getBlankCount(answer) {
  return Array.isArray(answer) ? answer.length : 1
}

export function createEmptyInputs(answer) {
  return Array(getBlankCount(answer)).fill('')
}

export function checkAnswer(userInputs, expected) {
  if (Array.isArray(expected)) {
    if (!Array.isArray(userInputs) || userInputs.length !== expected.length) {
      return false
    }
    return expected.every(
      (ans, i) => normalize(userInputs[i] ?? '') === normalize(ans),
    )
  }
  const single = Array.isArray(userInputs) ? (userInputs[0] ?? '') : userInputs
  return normalize(single) === normalize(expected)
}
