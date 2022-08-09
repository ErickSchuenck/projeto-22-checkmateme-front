export function pawnRules(previousX, previousY, newX, newY, boardState, colorOfPiece) {
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
  return false
}

export function whitePawnRules(previousX, previousY, newX, newY, boardState, colorOfPiece) {
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

export function blackPawnRules(previousX, previousY, newX, newY, boardState, colorOfPiece) {
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

export function pawnCaptureRules(previousX, previousY, newX, newY, boardState, colorOfPiece) {
  let AllowedYAxisToMove;
  colorOfPiece === 'White' ? AllowedYAxisToMove = previousY + 1 : AllowedYAxisToMove = previousY - 1

  if (!isThereAPieceInThePawnCaptureSquare(newX, newY, boardState, colorOfPiece)) {
    return false
  }

  if ((newY === AllowedYAxisToMove && newX === (previousX - 1)) || (newY === AllowedYAxisToMove && newX === (previousX + 1))) {
    return true
  }
  return false
}

function isThereAPieceInThePawnCaptureSquare(newX, newY, boardState, colorOfPiece) {
  for (let i = 0; i < boardState.length; i++) {
    if (boardState[i].key === `${newX},${newY}`) {
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