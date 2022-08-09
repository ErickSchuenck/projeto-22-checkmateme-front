export function squareIsInCheck(newX, newY, boardState, colorOfPiece) {

  let opponentsColor;
  colorOfPiece === 'White' ? opponentsColor = 'Black' : opponentsColor = 'White'

  if (
    squareIsBeingCheckedByItsRows(newX, newY, boardState, opponentsColor, 'Left') ||
    squareIsBeingCheckedByItsRows(newX, newY, boardState, opponentsColor, 'Right') ||

    squareIsBeingCheckedByItsColumns(newX, newY, boardState, opponentsColor, 'Upper') ||
    squareIsBeingCheckedByItsColumns(newX, newY, boardState, opponentsColor, 'Lower') ||

    squareIsBeingCheckedByItsDiagonals(newX, newY, boardState, opponentsColor, 'UpperLeft') ||
    squareIsBeingCheckedByItsDiagonals(newX, newY, boardState, opponentsColor, 'UpperRight') ||
    squareIsBeingCheckedByItsDiagonals(newX, newY, boardState, opponentsColor, 'LowerLeft') ||
    squareIsBeingCheckedByItsDiagonals(newX, newY, boardState, opponentsColor, 'LowerRight') ||

    squareIsBeingCheckedByAKnight(newX, newY, boardState, opponentsColor) ||
    squareIsBeingCheckedByAKing(newX, newY, boardState, opponentsColor)
  ) {
    return true
  }

  else return false
}

function squareIsBeingCheckedByAKing(newX, newY, boardState, opponentsColor) {

  for (let i = 0; i < boardState.length; i++) {
    const piece = boardState[i].props.type
    const color = boardState[i].props.color

    if (
      boardState[i].key === `${newX + 1},${newY}` ||
      boardState[i].key === `${newX - 1},${newY}` ||
      boardState[i].key === `${newX - 1},${newY - 1}` ||
      boardState[i].key === `${newX + 1},${newY + 1}` ||
      boardState[i].key === `${newX - 1},${newY - 1}` ||
      boardState[i].key === `${newX - 1},${newY + 1}` ||
      boardState[i].key === `${newX + 1},${newY - 1}` ||
      boardState[i].key === `${newX},${newY - 1}` ||
      boardState[i].key === `${newX},${newY + 1}`
    ) {
      if (piece === 'King' && color === opponentsColor) {
        return true
      }
    }
  }

  return false
}

function squareIsBeingCheckedByAKnight(newX, newY, boardState, opponentsColor) {
  for (let i = 0; i < boardState.length; i++) {
    const piece = boardState[i].props.type
    const color = boardState[i].props.color
    if (
      boardState[i].key === `${newX + 2},${newY + 1}` ||
      boardState[i].key === `${newX + 2},${newY - 1}` ||
      boardState[i].key === `${newX + 1},${newY + 2}` ||
      boardState[i].key === `${newX + 1},${newY - 2}` ||
      boardState[i].key === `${newX - 1},${newY + 2}` ||
      boardState[i].key === `${newX - 1},${newY - 2}` ||
      boardState[i].key === `${newX - 2},${newY + 1}` ||
      boardState[i].key === `${newX - 2},${newY - 1}`
    ) {
      if (piece === 'Knight' && color === opponentsColor) {
        return true
      }
    }
  }

  return false
}

function squareIsBeingCheckedByItsDiagonals(newX, newY, boardState, opponentsColor, direction) {

  for (let i = 1; i <= 7; i++) {
    let y;
    let x;

    if (direction === 'UpperRight') {
      x = newX + i
      y = newY + i
    }

    if (direction === 'LowerLeft') {
      x = newX - i
      y = newY - i
    }

    if (direction === 'UpperLeft') {
      x = newX - i
      y = newY + i
    }

    if (direction === 'LowerRight') {
      x = newX - i
      y = newY + i
    }

    const pieceType = squareIsOccupiedBy(x, y, boardState).type
    const pieceColor = squareIsOccupiedBy(x, y, boardState).color

    if (pieceType !== undefined) {
      if (pieceColor === opponentsColor) {
        if (pieceType === 'Bishop' || pieceType === 'Queen') {
          return true
        }
      }
      return false
    }
  }

  return false
}

function squareIsBeingCheckedByItsColumns(newX, newY, boardState, opponentsColor, direction) {

  for (let i = 1; i <= 7; i++) {
    let y;
    let x = newX;

    if (direction === 'Lower') {
      y = newY - i
    }

    if (direction === 'Upper') {
      y = newY + i
    }

    const pieceType = squareIsOccupiedBy(x, y, boardState).type
    const pieceColor = squareIsOccupiedBy(x, y, boardState).color

    if (pieceType !== undefined) {
      if (pieceColor === opponentsColor) {
        if (pieceType === 'Rook' || pieceType === 'Queen') {
          return true
        }
      }
      return false
    }
  }

  return false
}

function squareIsBeingCheckedByItsRows(newX, newY, boardState, opponentsColor, direction) {

  for (let i = 1; i <= 7; i++) {
    let x;

    if (direction === 'Left') {
      x = newX - i
    }

    if (direction === 'Right') {
      x = newX + i
    }

    let y = newY

    const pieceType = squareIsOccupiedBy(x, y, boardState).type
    const pieceColor = squareIsOccupiedBy(x, y, boardState).color

    if (pieceType !== undefined) {
      if (pieceColor === opponentsColor) {
        if (pieceType === 'Rook' || pieceType === 'Queen') {
          return true
        }
      }
      return false
    }
  }

  return false
}

function squareIsOccupiedBy(x, y, boardState) {

  for (let i = 0; i < boardState.length; i++) {
    if (boardState[i].key === `${x},${y}`) {
      if (boardState[i].props.pieceImg !== undefined) {
        return {
          type: boardState[i].props.type,
          color: boardState[i].props.color
        }
      }
    }
  }

  return false
}