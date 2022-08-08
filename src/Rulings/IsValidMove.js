export default function isValidMove(previousX, previousY, newX, newY, typeOfPiece, colorOfPiece, myColor, boardState) {
  console.log(`Hello ${myColor} player, trying to move your ${colorOfPiece} ${typeOfPiece} from ${previousX},${previousY} to ${newX},${newY}`)

  if (!checkForPieceColor(colorOfPiece, myColor)) {
    // return false
    // comentado por enquanto, pois ambas cores devem ser testadas
  }

  if (!(pieceIsMoving(previousX, previousY, newX, newY))) {
    console.log('piece is not moving')
    return false
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
    return rookRules(previousX, previousY, newX, newY, boardState, colorOfPiece)
  }

  // Knight rulings
  if (typeOfPiece === 'Knight') {
    return knightRules(previousX, previousY, newX, newY, boardState)
  }

  // Bishop rulings
  if (typeOfPiece === 'Bishop') {
    return (bishopRules(previousX, previousY, newX, newY, boardState))
  }

  // Queen rulings
  if (typeOfPiece === 'Queen') {
    return (queenRules(previousX, previousY, newX, newY, boardState))
  }

  // King rulings
  if (typeOfPiece === 'King') {
    return (kingRules(previousX, previousY, newX, newY))
  }
}

function kingRules(previousX, previousY, newX, newY) {
  return false
}

function queenRules(previousX, previousY, newX, newY, boardState) {
  let movingAxis;
  let queenIsMovingOnRowsOrColumns = false;
  const movingDiagonal = checkWhatKindOfDiagonalThisIs(previousX, newX, previousY, newY)

  if (previousX === newX) {
    movingAxis = 'Y'
    queenIsMovingOnRowsOrColumns = true
    if (RookOrQueenIsCollidingWithAPiece(previousX, previousY, newX, newY, boardState, movingAxis)) {
      return false
    }
    return true
  }

  if (previousY === newY) {
    queenIsMovingOnRowsOrColumns = true
    movingAxis = 'X'
    if (RookOrQueenIsCollidingWithAPiece(previousX, previousY, newX, newY, boardState, movingAxis)) {
      return false
    }
    return true
  }

  if (queenIsMovingOnRowsOrColumns === false) {
    if (isADiagonal(previousX, previousY, newX, newY) === false) {
      return false
    }

    if (BishopOrQueenIsCollidingWithAPiece(previousX, previousY, newX, newY, boardState, movingDiagonal)) {
      return false
    }
  }

  return true
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

function pieceIsMoving(previousX, previousY, newX, newY) {
  if (previousX === newX && previousY === newY) {
    return false
  } else {
    return true
  }
}

function bishopRules(previousX, previousY, newX, newY, boardState) {
  const movingDiagonal = checkWhatKindOfDiagonalThisIs(previousX, newX, previousY, newY);

  if (!(isADiagonal(previousX, previousY, newX, newY))) {
    return false
  }

  if ((BishopOrQueenIsCollidingWithAPiece(previousX, previousY, newX, newY, boardState, movingDiagonal))) {
    return false
  }

  return true
}

function BishopOrQueenIsCollidingWithAPiece(previousX, previousY, newX, newY, boardState, movingDiagonal) {
  console.log(movingDiagonal)
  const sumOfPreviousXandY = previousX + previousY
  const previousXDecreasedByPreviousY = previousX - previousY

  if (movingDiagonal === 'upperLeft') {
    for (let x = newX + 1; x < previousX; x++) {
      for (let y = newY - 1; y > previousY; y--) {
        if (x + y === sumOfPreviousXandY) {
          for (let i = 0; i < boardState.length; i++) {
            if (boardState[i].key === `${x},${y}`) {
              if (boardState[i].props.pieceImg !== undefined) {
                return true
              }
            }
          }
        }
      }
    }
  }

  if (movingDiagonal === 'upperRight') {
    for (let x = newX - 1; x > previousX; x--) {
      for (let y = newY - 1; y > previousY; y--) {
        if (x - y === previousXDecreasedByPreviousY) {
          for (let i = 0; i < boardState.length; i++) {
            if (boardState[i].key === `${x},${y}`) {
              if (boardState[i].props.pieceImg !== undefined) {
                return true
              }
            }
          }
        }
      }
    }
  }

  if (movingDiagonal === 'lowerLeft') {
    for (let x = newX + 1; x < previousX; x++) {
      for (let y = newY + 1; y < previousY; y++) {
        if (x - y === previousXDecreasedByPreviousY) {
          for (let i = 0; i < boardState.length; i++) {
            if (boardState[i].key === `${x},${y}`) {
              if (boardState[i].props.pieceImg !== undefined) {
                return true
              }
            }
          }
        }
      }
    }
  }

  if (movingDiagonal === 'lowerRight') {
    for (let x = newX - 1; x > previousX; x--) {
      for (let y = newY + 1; y < previousY; y++) {
        if (x + y === sumOfPreviousXandY) {
          for (let i = 0; i < boardState.length; i++) {
            if (boardState[i].key === `${x},${y}`) {
              if (boardState[i].props.pieceImg !== undefined) {
                return true
              }
            }
          }
        }
      }
    }
  }
  return false
}

function checkWhatKindOfDiagonalThisIs(previousX, newX, previousY, newY) {
  if (previousX < newX && previousY < newY) {
    return 'upperRight'
  }

  if (newX < previousX && previousY < newY) {
    return 'upperLeft'
  }

  if (newX < previousX && newY < previousY) {
    return 'lowerLeft'
  }

  if (previousX < newX && newY < previousY) {
    return 'lowerRight'
  }
}

function isADiagonal(previousX, previousY, newX, newY) {
  for (let i = 0; i <= 7; i++) {
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

function rookRules(previousX, previousY, newX, newY, boardState, colorOfPiece) {
  let movingAxis;

  if (previousX === newX) {
    movingAxis = 'Y'
  }
  if (previousY === newY) {
    movingAxis = 'X'
  }

  if (previousX !== newX && newY !== previousY) {
    return false
  }

  if (movingAxis === 'X') {
    for (let i = previousX; i < newX; i++) {
      console.log('test')
    }
  }

  if (RookOrQueenIsCollidingWithAPiece(previousX, previousY, newX, newY, boardState, movingAxis)) {
    return false
  }

  if (RookIsCapturingAPieceOfSameColor(newX, newY, boardState, colorOfPiece)) {
    return false
  }

  return true
}

function RookIsCapturingAPieceOfSameColor(newX, newY, boardState, colorOfPiece) {
  for (let i = 0; i < boardState.length; i++) {
    if (boardState[i].key === `${newX},${newY}`) {
      if (boardState[i].props.color === colorOfPiece) {
        return true
      }
    }
  }
  return false
}

function RookOrQueenIsCollidingWithAPiece(previousX, previousY, newX, newY, boardState, movingAxis) {
  if (movingAxis === 'Y') {
    if (previousY < newY) {
      for (let y = previousY + 1; y < newY; y++) {
        for (let i = 0; i < boardState.length; i++) {
          if (boardState[i].key === `${previousX},${y}`) {
            if (boardState[i].props.pieceImg !== undefined) {
              return true
            }
          }
        }
      }
    }

    if (newY < previousY) {
      for (let y = previousY - 1; y > newY; y--) {
        for (let i = 0; i < boardState.length; i++) {
          if (boardState[i].key === `${previousX},${y}`) {
            if (boardState[i].props.pieceImg !== undefined) {
              return true
            }
          }
        }
      }
    }
  }

  if (movingAxis === 'X') {
    if (previousX < newX) {
      for (let x = previousX + 1; x < newX; x++) {
        for (let i = 0; i < boardState.length; i++) {
          if (boardState[i].key === `${x},${previousY}`) {
            if (boardState[i].props.pieceImg !== undefined) {
              return true
            }
          }
        }
      }
    }

    if (newX < previousX) {
      for (let x = previousX - 1; x > newX; x--) {
        for (let i = 0; i < boardState.length; i++) {
          if (boardState[i].key === `${x},${previousY}`) {
            if (boardState[i].props.pieceImg !== undefined) {
              return true
            }
          }
        }
      }
    }
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