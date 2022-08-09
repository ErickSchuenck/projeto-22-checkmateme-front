export function isARowOrColumn(previousX, previousY, newX, newY) {
  if (previousX !== newX && newY !== previousY) {
    return false
  }
  return true
}

export function checkIfAxisIsXOrY(previousX, previousY, newX, newY) {
  if (previousX === newX) {
    return 'Y'
  }
  if (previousY === newY) {
    return 'X'
  }
}

export function IsCapturingAPieceOfSameColor(newX, newY, boardState, colorOfPiece) {
  for (let i = 0; i < boardState.length; i++) {
    if (boardState[i].key === `${newX},${newY}`) {
      if (boardState[i].props.color === colorOfPiece) {
        return true
      }
    }
  }
  return false
}

export function RookOrQueenIsCollidingWithAPiece(previousX, previousY, newX, newY, boardState, movingAxis) {
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

export function checkWhatKindOfDiagonalThisIs(previousX, newX, previousY, newY) {
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

export function isADiagonal(previousX, previousY, newX, newY) {
  for (let i = 0; i <= 7; i++) {
    if (Math.abs(previousX - newX) === Math.abs(previousY - newY)) {
      return true
    }
  }
  return false
}

export function BishopOrQueenIsCollidingWithAPiece(previousX, previousY, newX, newY, boardState, movingDiagonal) {
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
