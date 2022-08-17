const XAxis = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
const YAxis = ['1', '2', '3', '4', '5', '6', '7', '8']

export default function convertNotation(previousX, previousY, newX, newY) {
  return ({
    from: `${XAxis[previousX]}${YAxis[previousY]}`,
    to: `${XAxis[newX]}${YAxis[newY]}`
  })
}