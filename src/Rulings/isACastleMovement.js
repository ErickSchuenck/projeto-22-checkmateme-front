import { kingIsInCheck } from "./kingRules";
import { squareIsInCheck } from "./squareIsInCheckRules";

export function isACastleMovement(boardState, newX, colorOfPiece, typeOfPiece) {

  const shortOrLong = typeOfCastle(newX)

  if (typeOfPiece !== 'King') {
    return false
  }

  if (kingIsInCheck(colorOfPiece, boardState)) {
    return false
  }

  if (!(kingIsInPositionForCastling(boardState, colorOfPiece))) {
    return false
  }

  if (!(rookIsInPositionForCastling(boardState, newX, colorOfPiece))) {
    return false
  }

  if (pathToCastleIsOccupiedOrUnderAttack(boardState, shortOrLong, colorOfPiece)) {
    return false
  }

  return true
}

function kingIsInPositionForCastling(boardState, colorOfPiece) {

  for (let i = 0; i < boardState.length; i++) {
    if (boardState[i].props.type === 'King' && boardState[i].props.color === colorOfPiece) {
      if (colorOfPiece === 'White') {
        if (boardState[i].key === '4,0') {
          return true
        }
      }
      if (colorOfPiece === 'Black') {
        if (boardState[i].key === '4,7') {
          return true
        }
      }
    }
  }
  return false
}

function rookIsInPositionForCastling(boardState, newX, colorOfPiece) {
  if (newX === 6) {

    if (colorOfPiece === 'Black') {
      for (let i = 0; i < boardState.length; i++) {
        if (boardState[i].key === '7,7') {
          if (boardState[i].props.type === 'Rook' && boardState[i].props.color === 'Black') {
            return true
          } else {
            return false
          }
        }
      }
    }

    if (colorOfPiece === 'White') {
      for (let i = 0; i < boardState.length; i++) {
        if (boardState[i].key === '7,0') {
          if (boardState[i].props.type === 'Rook' && boardState[i].props.color === 'White') {
            return true
          } else {
            return false
          }
        }
      }
    }
  }

  if (newX === 2) {
    if (colorOfPiece === 'Black') {
      for (let i = 0; i < boardState.length; i++) {
        if (boardState[i].key === '0,7') {
          if (boardState[i].props.type === 'Rook' && boardState[i].props.color === 'Black') {
            return true
          } else {
            return false
          }
        }
      }
    }

    if (colorOfPiece === 'White') {
      for (let i = 0; i < boardState.length; i++) {
        if (boardState[i].key === '0,0') {
          if (boardState[i].props.type === 'Rook' && boardState[i].props.color === 'White') {
            return true
          } else {
            return false
          }
        }
      }
    }
  }

  return false
}

export function typeOfCastle(newX) {
  if (newX === 6) {
    return 'Short'
  }

  if (newX === 2) {
    return 'Long'
  }

  return false
}

function pathToCastleIsOccupiedOrUnderAttack(boardState, shortOrLong, colorOfPiece) {

  let coordinatesToBeChecked;

  if (shortOrLong === false) {
    console.log('something went wrong')
    return null
  }

  if (colorOfPiece === 'White') {
    if (shortOrLong === 'Long') {
      coordinatesToBeChecked = ['1,0', '2,0', '3,0']
    }
    if (shortOrLong === 'Short') {
      coordinatesToBeChecked = ['5,0', '6,0']
    }
  }

  if (colorOfPiece === 'Black') {
    if (shortOrLong === 'Long') {
      coordinatesToBeChecked = ['1,7', '2,7', '3,7']
    }
    if (shortOrLong === 'Short') {
      coordinatesToBeChecked = ['5,7', '6,7']
    }
  }

  if (coordinatesAreOccupied(boardState, coordinatesToBeChecked)) {
    return true
  }

  for (let i = 0; i < coordinatesToBeChecked.length; i++) {
    let x = coordinatesToBeChecked[i][0]
    let y = coordinatesToBeChecked[i][2]
    if (squareIsInCheck(x, y, boardState, colorOfPiece)) {
      return true
    }
  }

  return false
}

function coordinatesAreOccupied(boardState, coordinatesToBeChecked) {

  for (let i = 0; i < boardState.length; i++) {
    for (let j = 0; j < coordinatesToBeChecked.length; j++) {
      if (boardState[i].key === coordinatesToBeChecked[j]) {
        if (boardState[i].props.type !== undefined) {
          return true
        }
      }
    }
  }

  return false
}
