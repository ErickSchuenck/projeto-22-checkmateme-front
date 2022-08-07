export default function isValidMove(previousX, previousY, newX, newY, typeOfPiece, colorOfPiece, myColor, boardState) {
  console.log(`Hello ${myColor} player, trying to move your ${colorOfPiece} ${typeOfPiece} from ${previousX},${previousY} to ${newX},${newY}`)

  if (!checkForPieceColor(colorOfPiece, myColor || pieceIsNotMoving(previousX, previousY, newX, newY))) {
    // return false
    // comentado por enquanto, pois ambas cores devem ser testadas
  }

  // Pawn rulings
  if (typeOfPiece === 'Pawn') {
    if (pawnCaptureRules(previousX, previousY, newX, newY, boardState, colorOfPiece)) {
      return true
    }
    if (frontalSquareIsBlocked(previousX, previousY, boardState, colorOfPiece)) {
      return false
    }
    if (colorOfPiece === 'Black') {
      return blackPawnRules(previousX, previousY, newX, newY, boardState, colorOfPiece)
    }
    if (colorOfPiece === 'White') {
      return whitePawnRules(previousX, previousY, newX, newY, boardState, colorOfPiece)
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
  if (typeOfPiece === 'Queen') {
    return (queenRules(previousX, previousY, newX, newY))
  }

  // King rulings
  if (typeOfPiece === 'King') {
    return (kingRules(previousX, previousY, newX, newY))
  }
}

function kingRules(previousX, previousY, newX, newY) {
  return false
}

function queenRules(previousX, previousY, newX, newY) {
  for (let i = 0; i < 8; i++) {
    if (Math.abs(previousX - newX) === Math.abs(previousY - newY)) {
      return true
    }
  }
  if (previousX === newX) {
    return true
  }
  if (previousY === newY) {
    return true
  }
  return false
}

function frontalSquareIsBlocked(previousX, previousY, boardState, colorOfPiece) {
  if (colorOfPiece === 'White') {
    for (let i = 0; i < boardState.length; i++) {
      if (boardState[i].key === `${previousX},${previousY + 1}`) {
        if (boardState[i].props.pieceImg !== undefined) {
          return true
        }
      }
    }
  }

  if (colorOfPiece === 'Black') {
    for (let i = 0; i < boardState.length; i++) {
      if (boardState[i].key === `${previousX},${previousY - 1}`) {
        if (boardState[i].props.pieceImg !== undefined) {
          return true
        }
      }
    }
  }

  return false
}

function twoFrontalSquaresAreBlocked(previousX, previousY, boardState, colorOfPiece) {
  if (colorOfPiece === 'White') {
    for (let i = 0; i < boardState.length; i++) {
      if (boardState[i].key === `${previousX},${previousY + 1}` || boardState[i].key === `${previousX},${previousY + 2}`) {
        if (boardState[i].props.pieceImg !== undefined) {
          return true
        }
      }
    }
  }

  if (colorOfPiece === 'Black') {
    for (let i = 0; i < boardState.length; i++) {
      if (boardState[i].key === `${previousX},${previousY - 1}` || boardState[i].key === `${previousX},${previousY - 2}`) {
        if (boardState[i].props.pieceImg !== undefined) {
          return true
        }
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
  for (let i = 0; i < 8; i++) {
    if (Math.abs(previousX - newX) === Math.abs(previousY - newY)) {
      return true
    }
  }
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

function whitePawnRules(previousX, previousY, newX, newY, boardState, colorOfPiece) {
  const oneSquarePawnAdvance = () => {
    if (previousY - newY === -1 && previousX === newX) {
      return true
    } else {
      return false
    }
  }

  const twoSquaresPawnAdvance = () => {
    if (twoFrontalSquaresAreBlocked(previousX, previousY, boardState, colorOfPiece)) {
      return false
    }
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

function blackPawnRules(previousX, previousY, newX, newY, boardState, colorOfPiece) {
  const oneSquarePawnAdvance = () => {
    if (previousY - newY === 1 && previousX === newX) {
      return true
    } else {
      return false
    }
  }

  const twoSquaresPawnAdvance = () => {
    if (twoFrontalSquaresAreBlocked(previousX, previousY, boardState, colorOfPiece)) {
      return false
    }
    if (previousY === 6 && newY === 4 && previousX === newX) {
      return true
    } else {
      return false
    }
  }

  if (oneSquarePawnAdvance() === false && twoSquaresPawnAdvance() === false) {
    return false
  }

  return true
}

function checkForPieceColor(colorOfPiece, myColor) {
  if (colorOfPiece !== myColor) {
    return false
  } return true
}

function pawnCaptureRules(previousX, previousY, newX, newY, boardState, colorOfPiece) {
  let AllowedYAxisToMove;
  colorOfPiece === 'White' ? AllowedYAxisToMove = previousY + 1 : AllowedYAxisToMove = previousY - 1

  if (!isThereAPieceInTheCaptureSquare(newX, newY, boardState, colorOfPiece)) {
    return false
  }

  if ((newY === AllowedYAxisToMove && newX === (previousX - 1)) || (newY === AllowedYAxisToMove && newX === (previousX + 1))) {
    return true
  }
  return false
}

function isThereAPieceInTheCaptureSquare(newX, newY, boardState, colorOfPiece) {
  for (let i = 0; i < boardState.length; i++) {
    if (boardState[i].key === `${newX},${newY}`) {
      console.log(boardState[i].props.color)
      if (boardState[i].props.pieceImg === undefined) {
        return false
      }
      if (boardState[i].props.color === colorOfPiece) {
        return false
      }
    }
  }
  return true
}