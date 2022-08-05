export default function isValidMove(previousX, previousY, newX, newY, typeOfPiece, colorOfPiece, myColor) {

  console.log('...........................................')
  console.log('checking if move is valid...')
  console.log('previous location', previousX, previousY)
  console.log('new location', newX, newY)
  console.log('type of piece', typeOfPiece)
  console.log('color of piece', colorOfPiece)
  console.log('...........................................')

  if (!checkForPieceColor(colorOfPiece, myColor || checkIfPieceIsNotMoving(previousX, previousY, newX, newY))) {
    return false
  }

  // white pawn rules
  if (typeOfPiece === 'Pawn' && colorOfPiece === 'White') {
    return whitePawnRules(previousX, previousY, newX, newY)
  }

  // black pawn rules
  if (typeOfPiece === 'Pawn' && colorOfPiece === 'Black') {
    return blackPawnRules(previousX, previousY, newX, newY)
  }

  // Rook rulings
  if (typeOfPiece === 'Rook') {
    return rookRules(previousX, previousY, newX, newY)
  }

  // Knight rulings
  if (typeOfPiece === 'Knight') {
    return knightRules(previousX, previousY, newX, newY)
  }

  // Bishop rulings
  if (typeOfPiece === 'Bishop') {
    return (bishopRules(previousX, previousY, newX, newY))
  }

  // Queen rulings
  // King rulings
}

function checkIfPieceIsNotMoving(previousX, previousY, newX, newY) {
  if (previousX === newX && previousY && newY) {
    console.log('Previous X and new X cant be equal if previous Y and new Y are also equal')
    return false
  }
  return true
}

function bishopRules(previousX, previousY, newX, newY) {
  return false
}

function knightRules(previousX, previousY, newX, newY) {

  if ((Math.abs(previousX - newX) === 1 && Math.abs(previousY - newY) === 2) || (Math.abs(previousX - newX) === 2 && Math.abs(previousY - newY) === 1)) {
    console.log('Valid knight move')
    return true
  } else {
    console.log('Invalid knight move')
    return false
  }
}

function rookRules(previousX, previousY, newX, newY) {
  if (previousX === newX) {
    console.log(`Valid move, your rook moved in its row`)
    return true
  }
  if (previousY === newY) {
    console.log(`Valid move, your rook moved in its column`)
    return true
  }
  console.log('Invalid move, neither row, nor column did match')
  return false
}

function whitePawnRules(previousX, previousY, newX, newY) {
  const oneSquarePawnAdvance = () => {
    if (previousY - newY === -1 && previousX === newX) {
      console.log('white pawn advanced 1 square')
      return true
    } else {
      return false
    }
  }

  const twoSquaresPawnAdvance = () => {
    if (previousY === 1 && newY === 3 && previousX === newX) {
      console.log('white pawn advanced 2 squares')
      return true
    } else {
      return false
    }
  }

  if (oneSquarePawnAdvance() === false && twoSquaresPawnAdvance() === false) {
    console.log('INVALID MOVE!!!!!')
    return false
  } else {
    console.log(oneSquarePawnAdvance(), twoSquaresPawnAdvance())
    console.log('VALID MOVE')
    return true
  }
}

function blackPawnRules(previousX, previousY, newX, newY) {
  const oneSquarePawnAdvance = () => {
    if (previousY - newY === 1 && previousX === newX) {
      console.log('black pawn advanced 1 square')
      return true
    } else {
      console.log('black pawn did not advance one square')
      return false
    }
  }

  const twoSquaresPawnAdvance = () => {
    if (previousY === 6 && newY === 4 && previousX === newX) {
      console.log('black pawn advanced 2 squares')
      return true
    } else {
      console.log('black pawn did not advanced 2 squares')
      return false
    }
  }

  if (oneSquarePawnAdvance() === false && twoSquaresPawnAdvance() === false) {
    console.log('INVALID MOVE!!!!!')
    return false
  } else {
    console.log(oneSquarePawnAdvance(), twoSquaresPawnAdvance())
    console.log('VALID MOVE')
    return true
  }
}

function checkForPieceColor(colorOfPiece, myColor) {
  if (colorOfPiece !== myColor) {
    console.log(`That is not your color!!!!! Your color is ${myColor} and this piece is ${colorOfPiece}`)
    return false
  } return true
}