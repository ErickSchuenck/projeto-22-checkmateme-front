import {
  checkWhatKindOfDiagonalThisIs,
  isADiagonal,
  BishopOrQueenIsCollidingWithAPiece,
  IsCapturingAPieceOfSameColor
} from './utils';

export function bishopRules(
  previousX,
  previousY,
  newX,
  newY,
  boardState,
  colorOfPiece
) {
  if (!isADiagonal(previousX, previousY, newX, newY)) {
    return false;
  }

  const movingDiagonal = checkWhatKindOfDiagonalThisIs(
    previousX,
    newX,
    previousY,
    newY
  );

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

  if (IsCapturingAPieceOfSameColor(newX, newY, boardState, colorOfPiece)) {
    return false;
  }

  return true;
}
