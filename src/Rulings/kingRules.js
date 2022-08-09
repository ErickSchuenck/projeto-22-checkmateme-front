import { IsCapturingAPieceOfSameColor, isADiagonal, checkWhatKindOfDiagonalThisIs, isARowOrColumn, checkIfAxisIsXOrY } from "./utils";

export function kingRules(previousX, previousY, newX, newY, boardState, colorOfPiece) {

  if (IsCapturingAPieceOfSameColor(newX, newY, boardState, colorOfPiece)) {
    return false
  }

  if (isADiagonal(previousX, previousY, newX, newY)) {
    const movingDiagonal = checkWhatKindOfDiagonalThisIs(previousX, newX, previousY, newY);
    const kingDiagonalIsMovingASingleSquare = kingDiagonalMovementIsMatching(previousX, newX, previousY, newY, movingDiagonal)
    if (!kingDiagonalIsMovingASingleSquare) {
      return false
    }
  }

  else if (isARowOrColumn(previousX, previousY, newX, newY)) {
    const movingAxis = checkIfAxisIsXOrY(previousX, previousY, newX, newY)
    if (!isMovingSingleSquareInRowOrColumn(movingAxis, previousX, newX, previousY, newY)) {
      return false
    }
  }

  if (!(isADiagonal(previousX, previousY, newX, newY)) && !(isARowOrColumn(previousX, previousY, newX, newY))) {
    return false
  }

  return true
}

function kingDiagonalMovementIsMatching(previousX, newX, previousY, newY, movingDiagonal) {
  if (movingDiagonal === 'upperLeft') {
    if (!(newX === previousX - 1 && newY === previousY + 1)) {
      return false
    }
  }

  if (movingDiagonal === 'upperRight') {
    if (!(newX === previousX + 1 && newY === previousY + 1)) {
      return false
    }
  }

  if (movingDiagonal === 'lowerRight') {
    if (!(newX === previousX + 1 && newY === previousY - 1)) {
      return false
    }
  }

  if (movingDiagonal === 'lowerLeft') {
    if (!(newX === previousX - 1 && newY === previousY - 1)) {
      return false
    }
  }

  return true
}

function isMovingSingleSquareInRowOrColumn(movingAxis, previousX, newX, previousY, newY) {

  if (movingAxis === 'X') {
    if (previousX + 1 !== newX && previousX - 1 !== newX) {
      return false
    }
  }

  if (movingAxis === 'Y') {
    if (previousY + 1 !== newY && previousY - 1 !== newY) {
      return false
    }
  }

  return true
}
