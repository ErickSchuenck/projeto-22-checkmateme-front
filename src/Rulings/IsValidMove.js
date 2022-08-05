export default function isValidMove(previousX, previousY, newX, newY, typeOfPiece, colorOfPiece, myColor, boardState) {
  console.log(`Hello ${myColor} player, trying to move your ${colorOfPiece} ${typeOfPiece} from ${previousX},${previousY} to ${newX},${newY}`)

  if (!checkForPieceColor(colorOfPiece, myColor || pieceIsNotMoving(previousX, previousY, newX, newY))) {
    return false
  }

  // Pawn rulings
  if (typeOfPiece === 'Pawn') {
    if (frontalSquareIsBlocked(previousX, previousY, boardState)) {
      return false
    }
    if (colorOfPiece === 'Black') {
      return blackPawnRules(previousX, previousY, newX, newY)
    }
    if (colorOfPiece === 'White') {
      return whitePawnRules(previousX, previousY, newX, newY)
    }
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

function frontalSquareIsBlocked(previousX, previousY, boardState) {
  for (let i = 0; i < boardState.length; i++) {
    if (boardState[i].key === `${previousX},${previousY + 1}`) {
      if (boardState[i].props.pieceImg !== undefined) {
        console.log('invalid')
        return true
      }
    }
  }
  return false
}

function pieceIsNotMoving(previousX, previousY, newX, newY) {
  if (previousX === newX && previousY && newY) {
    return false
  }
  return true
}

function bishopRules(previousX, previousY, newX, newY) {
  return false
}

function knightRules(previousX, previousY, newX, newY) {
  if ((Math.abs(previousX - newX) === 1 && Math.abs(previousY - newY) === 2) || (Math.abs(previousX - newX) === 2 && Math.abs(previousY - newY) === 1)) {
    return true
  } else {
    return false
  }
}

function rookRules(previousX, previousY, newX, newY) {
  if (previousX === newX) {
    return true
  }
  if (previousY === newY) {
    return true
  }
  return false
}

function whitePawnRules(previousX, previousY, newX, newY) {
  const oneSquarePawnAdvance = () => {
    if (previousY - newY === -1 && previousX === newX) {
      return true
    } else {
      return false
    }
  }

  const twoSquaresPawnAdvance = () => {
    if (previousY === 1 && newY === 3 && previousX === newX) {
      return true
    } else {
      return false
    }
  }

  if (oneSquarePawnAdvance() === false && twoSquaresPawnAdvance() === false) {
    return false
  } else {
    return true
  }
}

function blackPawnRules(previousX, previousY, newX, newY) {
  const oneSquarePawnAdvance = () => {
    if (previousY - newY === 1 && previousX === newX) {
      return true
    } else {
      return false
    }
  }

  const twoSquaresPawnAdvance = () => {
    if (previousY === 6 && newY === 4 && previousX === newX) {
      return true
    } else {
      return false
    }
  }

  if (oneSquarePawnAdvance() === false && twoSquaresPawnAdvance() === false) {
    return false
  } else {
    console.log(oneSquarePawnAdvance(), twoSquaresPawnAdvance())
    return true
  }
}

function checkForPieceColor(colorOfPiece, myColor) {
  if (colorOfPiece !== myColor) {
    return false
  } return true
}