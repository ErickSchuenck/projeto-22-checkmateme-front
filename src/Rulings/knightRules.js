import { IsCapturingAPieceOfSameColor } from './utils';

export function knightRules(
  previousX,
  previousY,
  newX,
  newY,
  boardState,
  colorOfPiece
) {
  const twoSquaresSidewaysAndOneVertical =
    Math.abs(previousX - newX) === 2 && Math.abs(previousY - newY) === 1;
  const twoSquaresVerticalAndOneSideways =
    Math.abs(previousX - newX) === 1 && Math.abs(previousY - newY) === 2;

  if (IsCapturingAPieceOfSameColor(newX, newY, boardState, colorOfPiece)) {
    return false;
  }

  if (!(twoSquaresSidewaysAndOneVertical || twoSquaresVerticalAndOneSideways)) {
    return false;
  }

  return true;
}
