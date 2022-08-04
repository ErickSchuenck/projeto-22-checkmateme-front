import styled from 'styled-components';
import Squares from '../Square/square';
import { useEffect, useRef, useState } from 'react';
// import {isValidMove} from '../../Rulings/IsValidMove'

const XAxis = ['a','b','c','d','e','f','g','h']
const initialBoardState = []

function InsertStartingPieces() {
    for(let i =0; i<2; i++){
    const color = (i === 1 ? 'White' : 'Black')
    const YPosition = (i === 0 ? 7 : 0)
    initialBoardState.push({pieceImg: `assets/${color}Rook.png`, XPosition: 0, YPosition, type: 'rook'})
    initialBoardState.push({pieceImg: `assets/${color}Knight.png`, XPosition: 1, YPosition, type: 'knight'})
    initialBoardState.push({pieceImg: `assets/${color}Bishop.png`, XPosition: 2, YPosition, type: 'bishop'})
    initialBoardState.push({pieceImg: `assets/${color}Queen.png`, XPosition: 3, YPosition, type: 'queen'})
    initialBoardState.push({pieceImg: `assets/${color}King.png`, XPosition: 4, YPosition, type: 'king'})
    initialBoardState.push({pieceImg: `assets/${color}Bishop.png`, XPosition: 5, YPosition, type: 'bishop'})
    initialBoardState.push({pieceImg: `assets/${color}Knight.png`, XPosition: 6, YPosition, type: 'knight'})
    initialBoardState.push({pieceImg: `assets/${color}Rook.png`, XPosition: 7, YPosition, type: 'rook'})
  }
  for (let i = 0; i < 8; i++){
    initialBoardState.push(
      {pieceImg: 'assets/whitePawn.png', XPosition: i, YPosition: 1, type: 'pawn'},
      {pieceImg: 'assets/BlackPawn.png',XPosition: i, YPosition: 6, type: 'pawn'}
    )
  }
}
InsertStartingPieces()

function isValidMove(previousX, previousY, newX, newY, typeOfPiece){
  console.log('...........................................')
  console.log('checking if move is valid...')
  console.log('previous location', previousX, previousY)
  console.log('new location', newX, newY)
  console.log('type of piece', typeOfPiece)
  console.log('...........................................')
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
            isValidMove(coordinateX, coordinateY, newX, newY, piece.type)
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