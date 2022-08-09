
import { isARowOrColumn, checkIfAxisIsXOrY, RookOrQueenIsCollidingWithAPiece, IsCapturingAPieceOfSameColor } from "./utils";

export function rookRules(previousX, previousY, newX, newY, boardState, colorOfPiece) {
  let movingAxis;

  if (!isARowOrColumn(previousX, previousY, newX, newY)) {
    return false
  }
  movingAxis = checkIfAxisIsXOrY(previousX, previousY, newX, newY)

  if (RookOrQueenIsCollidingWithAPiece(previousX, previousY, newX, newY, boardState, movingAxis)) {
    return false
  }

  if (IsCapturingAPieceOfSameColor(newX, newY, boardState, colorOfPiece)) {
    return false
  }

  return true
}