import { pawnRules } from "./pawnRules"
import { rookRules } from "./rookRules"
import { knightRules } from "./knightRules"
import { bishopRules } from "./bishopRules"
import { kingRules, kingIsInCheck } from "./kingRules"
import { queenRules } from "./queenRules"

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

  if (typeOfPiece === 'Pawn') {
    return pawnRules(previousX, previousY, newX, newY, boardState, colorOfPiece)
  }

  if (typeOfPiece === 'Rook') {
    return rookRules(previousX, previousY, newX, newY, boardState, colorOfPiece)
  }

  if (typeOfPiece === 'Knight') {
    return knightRules(previousX, previousY, newX, newY, boardState, colorOfPiece)
  }

  if (typeOfPiece === 'Bishop') {
    return (bishopRules(previousX, previousY, newX, newY, boardState, colorOfPiece))
  }

  if (typeOfPiece === 'Queen') {
    return (queenRules(previousX, previousY, newX, newY, boardState, colorOfPiece))
  }

  if (typeOfPiece === 'King') {
    return (kingRules(previousX, previousY, newX, newY, boardState, colorOfPiece))
  }
}

function pieceIsMoving(previousX, previousY, newX, newY) {
  if (previousX === newX && previousY === newY) {
    return false
  } else {
    return true
  }
}

function checkForPieceColor(colorOfPiece, myColor) {
  if (colorOfPiece !== myColor) {
    return false
  } return true
}
