import {
  checkWhatKindOfDiagonalThisIs,
  IsCapturingAPieceOfSameColor,
  RookOrQueenIsCollidingWithAPiece,
  isADiagonal,
  BishopOrQueenIsCollidingWithAPiece
} from './utils';

export function queenRules(
  previousX,
  previousY,
  newX,
  newY,
  boardState,
  colorOfPiece
) {
  let movingAxis;
  let queenIsMovingOnRowsOrColumns = false;
  const movingDiagonal = checkWhatKindOfDiagonalThisIs(
    previousX,
    newX,
    previousY,
    newY
  );

  if (IsCapturingAPieceOfSameColor(newX, newY, boardState, colorOfPiece)) {
    return false;
  }

  if (previousX === newX) {
    movingAxis = 'Y';
    queenIsMovingOnRowsOrColumns = true;
    if (
      RookOrQueenIsCollidingWithAPiece(
        previousX,
        previousY,
        newX,
        newY,
        boardState,
        movingAxis
      )
    ) {
      return false;
    }
    return true;
  }

  if (previousY === newY) {
    queenIsMovingOnRowsOrColumns = true;
    movingAxis = 'X';
    if (
      RookOrQueenIsCollidingWithAPiece(
        previousX,
        previousY,
        newX,
        newY,
        boardState,
        movingAxis
      )
    ) {
      return false;
    }
    return true;
  }

  if (queenIsMovingOnRowsOrColumns === false) {
    if (isADiagonal(previousX, previousY, newX, newY) === false) {
      return false;
    }

    if (
      BishopOrQueenIsCollidingWithAPiece(
        previousX,
        previousY,
        newX,
        newY,
        boardState,
        movingDiagonal
      )
    ) {
      return false;
    }
  }

  return true;
}
