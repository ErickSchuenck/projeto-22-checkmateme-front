import styled from 'styled-components';
import Squares from '../Square/square';
import { useEffect, useRef, useState } from 'react';
// import {isValidMove} from '../../Rulings/IsValidMove'

const XAxis = ['a','b','c','d','e','f','g','h']
const initialBoardState = []
const myColor = 'Black'

function InsertStartingPieces() {
    for(let i =0; i<2; i++){
    const color = (i === 1 ? 'White' : 'Black')
    const YPosition = (i === 0 ? 7 : 0)
    initialBoardState.push({pieceImg: `assets/${color}Rook.png`, XPosition: 0, YPosition, type: 'Rook', color})
    initialBoardState.push({pieceImg: `assets/${color}Knight.png`, XPosition: 1, YPosition, type: 'Knight', color})
    initialBoardState.push({pieceImg: `assets/${color}Bishop.png`, XPosition: 2, YPosition, type: 'Bishop', color})
    initialBoardState.push({pieceImg: `assets/${color}Queen.png`, XPosition: 3, YPosition, type: 'Queen', color})
    initialBoardState.push({pieceImg: `assets/${color}King.png`, XPosition: 4, YPosition, type: 'King', color})
    initialBoardState.push({pieceImg: `assets/${color}Bishop.png`, XPosition: 5, YPosition, type: 'Bishop', color})
    initialBoardState.push({pieceImg: `assets/${color}Knight.png`, XPosition: 6, YPosition, type: 'Knight', color})
    initialBoardState.push({pieceImg: `assets/${color}Rook.png`, XPosition: 7, YPosition, type: 'Rook', color})
  }
  for (let i = 0; i < 8; i++){
    initialBoardState.push(
      {pieceImg: 'assets/whitePawn.png', XPosition: i, YPosition: 1, type: 'Pawn', color: 'White'},
      {pieceImg: 'assets/BlackPawn.png',XPosition: i, YPosition: 6, type: 'Pawn', color:'Black'}
    )
  }
}
InsertStartingPieces()

function isValidMove(previousX, previousY, newX, newY, typeOfPiece, colorOfPiece){
  
  console.log('...........................................')
  console.log('checking if move is valid...')
  console.log('previous location', previousX, previousY)
  console.log('new location', newX, newY)
  console.log('type of piece', typeOfPiece)
  console.log('color of piece', colorOfPiece)
  console.log('...........................................')

  // pawn rules
  if (typeOfPiece === 'Pawn' && colorOfPiece === 'White'){
    console.log(whitePawnRules(previousX, previousY, newX, newY, typeOfPiece, colorOfPiece, myColor))  
  }
  if (typeOfPiece === 'Pawn' && colorOfPiece === 'Black'){
    console.log(blackPawnRules(previousX, previousY, newX, newY, typeOfPiece, colorOfPiece, myColor))
  }
  
}

function whitePawnRules(previousX, previousY, newX, newY, typeOfPiece, colorOfPiece, myColor){
  if (colorOfPiece !== myColor) {
    console.log(`That is not your color!!!!! Your color is ${myColor} and this piece is ${colorOfPiece}`)
    return false
  }
  const oneSquarePawnAdvance = ()=> {  
        if (typeOfPiece === 'Pawn' && previousY - newY === -1 && previousX === newX){
          console.log('white pawn advanced 1 square')
          return true
        } else {
          console.log('white pawn did not advance one square')
          return false
        }
    }

    const twoSquaresPawnAdvance = ()=> {  
        if (
          typeOfPiece === 'Pawn'
          && previousY === 1 
          && newY === 3 
          && previousX === newX){
          console.log('white pawn advanced 2 squares')
          return true
        } else {
          console.log('white pawn did not advanced 2 squares')
          return false
        }
    }

    if (oneSquarePawnAdvance() === false && twoSquaresPawnAdvance() === false){
      console.log('INVALID MOVE!!!!!')
      return false
    } else {
      console.log(oneSquarePawnAdvance(), twoSquaresPawnAdvance())
      console.log('VALID MOVE')
      return true
    }
}

function blackPawnRules(previousX, previousY, newX, newY, typeOfPiece, colorOfPiece, myColor){
  if (colorOfPiece !== myColor) {
    console.log(`That is not your color!!!!! Your color is ${myColor} and this piece is ${colorOfPiece}`)
    return false
  }
  const oneSquarePawnAdvance = ()=> {  
        if (typeOfPiece === 'Pawn' && previousY - newY === 1 && previousX === newX){
          console.log('black pawn advanced 1 square')
          return true
        } else {
          console.log('black pawn did not advance one square')
          return false
        }
    }

    const twoSquaresPawnAdvance = ()=> {  
        if (
          typeOfPiece === 'Pawn'
          && previousY === 6 
          && newY === 4 
          && previousX === newX){
          console.log('black pawn advanced 2 squares')
          return true
        } else {
          console.log('black pawn did not advanced 2 squares')
          return false
        }
    }

    if (oneSquarePawnAdvance() === false && twoSquaresPawnAdvance() === false){
      console.log('INVALID MOVE!!!!!')
      return false
    } else {
      console.log(oneSquarePawnAdvance(), twoSquaresPawnAdvance())
      console.log('VALID MOVE')
      return true
    }
}

export default function ChessBoard() {
  // const [activePiece, setActivePiece] = useState(null)
  let activePiece = null;
  const [coordinateX, setCoordinateX] = useState(0)
  const [coordinateY, setCoordinateY] = useState(0)
  // const x = Math.floor((event.clientX - chessboard.offsetLeft) / 58)
  // const y = Math.abs(Math.ceil((event.clientY - chessboard.offsetTop -464) / 58  ))

  const [pieces, setPieces] = useState(initialBoardState)
  const [newBoard, setNewBoard] = useState(getBoardConfig())
  const chessBoardRef = useRef(null)
  
  let xIni, yIni, squareSize;
  useEffect(() => {setNewBoard(getBoardConfig)},[pieces])

  function getBoardConfig(){
    const boardState = [];

    for (let y =7; y >= 0; y--){
      for (let x =0; x < XAxis.length; x++){
        const colorOfTheSquare = y + x;
        let pieceImg;
  
        pieces.forEach(piece => {
          if(piece.XPosition === x && piece.YPosition === y){
            pieceImg = piece.pieceImg;
          }
        })
  
        boardState.push(
          <Squares 
            key={`${y},${x}`}
            colorOfTheSquare={colorOfTheSquare} 
            pieceImg={pieceImg}
          />
        )
      }
    }
    return boardState
  }
  
  function grabPiece(event){
    const element = event.target;
    const chessboard = chessBoardRef.current
    if (element.classList.contains('Piece')){
      setCoordinateX(Math.floor((event.clientX - chessboard.offsetLeft) / 58))
      setCoordinateY(Math.abs(Math.ceil((event.clientY - chessboard.offsetTop -464) / 58 )))
      squareSize = element.offsetWidth;
      xIni = event.clientX;
      yIni = event.clientY;
      // setActivePiece(element)  
      activePiece = element
    }
  }

  function movePiece(event){
    if (activePiece){
      const x = 100 * (event.clientX - xIni) / squareSize;
      const y = 100 * (event.clientY - yIni) / squareSize;
      
      let leftConstraint = chessBoardRef.current.offsetLeft;
      let rightConstraint = chessBoardRef.current.offsetLeft + chessBoardRef.current.offsetWidth;
      let topConstraint = chessBoardRef.current.offsetTop;
      let bottomConstraint = chessBoardRef.current.offsetTop + chessBoardRef.current.offsetHeight;

      if (
        event.clientX > leftConstraint 
        && event.clientX < rightConstraint
        && event.clientY < bottomConstraint
        && event.clientY > topConstraint
        ){
        activePiece.style.transform = `translate(${x}%, ${y}%)`
      }
    }
  }

  function dropPiece(event){
    const chessboard = chessBoardRef.current
    
    if (activePiece){
      const newX = Math.floor((event.clientX - chessboard.offsetLeft) / 58) // 58 is the size of each square, should be fixed magic numbers
      const newY = Math.abs(Math.ceil((event.clientY - chessboard.offsetTop -464) / 58  )) // 58 is the size of each square, 464 is the size of the chessboard, should be fixed magic numbers

      
      setPieces(value => {
        return value.map(
          piece => {
          if (piece.XPosition === coordinateX && piece.YPosition === coordinateY){
            isValidMove(coordinateX, coordinateY, newX, newY, piece.type, piece.color)
            piece = {...piece, XPosition: newX, YPosition: newY }
          }
          return piece
        })
      })
      // setActivePiece(null)
      activePiece = null
    }
  }
  
  return(
    <Container 
      onMouseDown={event => grabPiece(event)}
      onMouseMove={event=> movePiece(event)} 
      onMouseUp={event => dropPiece(event)}
      id='chessboard'
      ref={chessBoardRef}
    >
      {newBoard}
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 58px);
  grid-template-rows: repeat(8, 58px);
  color: #854a4a;
  max-width:464px;
  left: 10px;
`