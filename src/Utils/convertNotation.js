export function convertNotationFromAppToApi(previousX, previousY, newX, newY) {
  const XAxis = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const YAxis = ['1', '2', '3', '4', '5', '6', '7', '8'];

  return {
    from: `${XAxis[previousX]}${YAxis[previousY]}`,
    to: `${XAxis[newX]}${YAxis[newY]}`
  };
}

export function convertNotationFromApiToApp(computerMove) {
  const fromLetter = computerMove[0];
  const toLetter = computerMove[2];

  const previousX = convertLetterIntoNumber(fromLetter);
  const newX = convertLetterIntoNumber(toLetter);

  const previousY = parseInt(computerMove[1]) - 1;
  const newY = parseInt(computerMove[3]) - 1;

  const from = { previousX, previousY };
  const to = { newX, newY };

  return { from, to };
}

function convertLetterIntoNumber(value) {
  value = value.toLowerCase();

  if (value === 'a') return 0;
  if (value === 'b') return 1;
  if (value === 'c') return 2;
  if (value === 'd') return 3;
  if (value === 'e') return 4;
  if (value === 'f') return 5;
  if (value === 'g') return 6;
  if (value === 'h') return 7;
}
