export function squareIsInCheck(newX, newY, boardState, colorOfPiece) {

  if (
    squareIsBeingCheckedByItsRows(newX, newY, boardState, colorOfPiece, 'Left') ||
    squareIsBeingCheckedByItsRows(newX, newY, boardState, colorOfPiece, 'Right') ||
    squareIsBeingCheckedByItsColumns(newX, newY, boardState, colorOfPiece, 'Upper') ||
    squareIsBeingCheckedByItsColumns(newX, newY, boardState, colorOfPiece, 'Lower') ||
    squareIsBeingCheckedByItsDiagonals(newX, newY, boardState, colorOfPiece, 'UpperLeft') ||
    squareIsBeingCheckedByItsDiagonals(newX, newY, boardState, colorOfPiece, 'UpperRight') ||
    squareIsBeingCheckedByItsDiagonals(newX, newY, boardState, colorOfPiece, 'LowerLeft') ||
    squareIsBeingCheckedByItsDiagonals(newX, newY, boardState, colorOfPiece, 'LowerRight')
  ) {
    return true
  }

  else return false
}

function squareIsBeingCheckedByItsDiagonals(newX, newY, boardState, colorOfPiece, direction) {
  // let opponentsColor;
  // colorOfPiece === 'White' ? opponentsColor = 'Black' : opponentsColor = 'White'

  // for (let i = 1; i <= 7; i++) {
  //   let y;
  //   let x = newX;

  //   if (direction === 'Lower') {
  //     y = newY - i
  //   }

  //   if (direction === 'Upper') {
  //     y = newY + i
  //   }

  //   const pieceType = squareIsOccupiedBy(x, y, boardState).type
  //   const pieceColor = squareIsOccupiedBy(x, y, boardState).color

  //   if (pieceType !== undefined) {
  //     if (pieceColor === opponentsColor) {
  //       if (pieceType === 'Rook' || pieceType === 'Queen') {
  //         return true
  //       }
  //     }
  //     return false
  //   }
  // }

  // return false
}

function squareIsBeingCheckedByItsColumns(newX, newY, boardState, colorOfPiece, direction) {
  let opponentsColor;
  colorOfPiece === 'White' ? opponentsColor = 'Black' : opponentsColor = 'White'

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

function squareIsBeingCheckedByItsRows(newX, newY, boardState, colorOfPiece, direction) {
  let opponentsColor;
  colorOfPiece === 'White' ? opponentsColor = 'Black' : opponentsColor = 'White'

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