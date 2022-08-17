

export function convertNotationFromAppToApi(previousX, previousY, newX, newY) {
  const XAxis = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
  const YAxis = ['1', '2', '3', '4', '5', '6', '7', '8']

  return ({
    from: `${XAxis[previousX]}${YAxis[previousY]}`,
    to: `${XAxis[newX]}${YAxis[newY]}`
  })
}

export function convertNotationFromApiToApp(computerMove) {
  let { from, to } = computerMove
  const fromLetter = from[0]
  const toLetter = to[0]

  const previousX = convertLetterIntoNumber(fromLetter)
  const newX = convertLetterIntoNumber(toLetter)

  const previousY = parseInt(from[1]) - 1
  const newY = parseInt(to[1]) - 1

  from = { previousX, previousY }
  to = { newX, newY }

  return { from, to }
}

function convertLetterIntoNumber(value) {
  if (value === 'a') return 0
  if (value === 'b') return 1
  if (value === 'c') return 2
  if (value === 'd') return 3
  if (value === 'e') return 4
  if (value === 'f') return 5
  if (value === 'g') return 6
  if (value === 'h') return 7
}