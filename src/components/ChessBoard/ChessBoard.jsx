import styled from 'styled-components';
import Squares from '../Square/square';
import { useEffect, useRef, useState } from 'react';

const YAxis = ['8','7','6','5','4','3','2','1']
const XAxis = ['a','b','c','d','e','f','g','h']
const initialBoardState = []
let board = []

for(let i =0; i<2; i++){
  const color = (i === 0 ? 'White' : 'Black')
  const YPosition = (i === 0 ? 7 : 0)
  initialBoardState.push({pieceImg: `assets/${color}Rook.png`, XPosition: 0, YPosition})
  initialBoardState.push({pieceImg: `assets/${color}Knight.png`, XPosition: 1, YPosition})
  initialBoardState.push({pieceImg: `assets/${color}Bishop.png`, XPosition: 2, YPosition})
  initialBoardState.push({pieceImg: `assets/${color}Queen.png`, XPosition: 3, YPosition})
  initialBoardState.push({pieceImg: `assets/${color}King.png`, XPosition: 4, YPosition})
  initialBoardState.push({pieceImg: `assets/${color}Bishop.png`, XPosition: 5, YPosition})
  initialBoardState.push({pieceImg: `assets/${color}Knight.png`, XPosition: 6, YPosition})
  initialBoardState.push({pieceImg: `assets/${color}Rook.png`, XPosition: 7, YPosition})
}
for (let i = 0; i < 8; i++){
  initialBoardState.push(
    {
      pieceImg: 'assets/BlackPawn.png',
      XPosition: i,
      YPosition: 1,
    }
  )
}
for (let i = 0; i < 8; i++){
  initialBoardState.push(
    {
      pieceImg: 'assets/whitePawn.png',
      XPosition: i,
      YPosition: 6,
    }
  )
}

export default function ChessBoard() {
  const [pieces, setPieces] = useState(initialBoardState)
  const [newBoard, setNewBoard] = useState(getBoardConfig())
  const chessBoardRef = useRef(null)
  let activePiece = null;
  let xIni, yIni, squareSize;
  useEffect(() => {setNewBoard(getBoardConfig)},[pieces])

  function getBoardConfig(){
    const boardState = [];

    for (let y =0; y < YAxis.length; y++){
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
    if (element.classList.contains('Piece')){
      squareSize = element.offsetWidth;
      xIni = event.clientX;
      yIni = event.clientY;
      activePiece = element;  
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
    console.log(event)
    const chessboard = chessBoardRef.current
    if (activePiece){
      const x = Math.floor((event.clientX - chessboard.offsetLeft) / 58) // 58 is the size of each square, should be fixed magic numbers
      const y = Math.floor((event.clientY - chessboard.offsetTop) / 58) // 58 is the size of each square, should be fixed magic numbers
      console.log(x, y)

      setPieces(value => {
        return value.map(
          piece => {
          if (piece.XPosition === 1 && piece.YPosition === 0){
            // piece.XPosition = x;
            // piece.YPosition = y;
            piece = {...piece, XPosition: x, YPosition: y }
            console.log()
          }
          return piece
        })
      })

      // setNewBoard(getBoardConfig())
      

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