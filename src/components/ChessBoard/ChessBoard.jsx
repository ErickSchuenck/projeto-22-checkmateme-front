import styled from 'styled-components';
import Squares from '../Square/square';
import { useEffect, useRef, useState } from 'react';
import isValidMove from '../../Rulings/index.js'

const XAxis = ['0','1','2','3','4','5','6','7']
const YAxis = ['0','1','2','3','4','5','6','7']
const initialBoardState = []
const myColor = 'White'

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

export default function ChessBoard() {
  const [activePiece, setActivePiece] = useState(null)
  const [coordinateX, setCoordinateX] = useState(0)
  const [coordinateY, setCoordinateY] = useState(0)
  const [pieces, setPieces] = useState(initialBoardState)
  const [newBoard, setNewBoard] = useState(getBoardConfig())
  const chessBoardRef = useRef(null)
  const [squareSize, setSquareSize] = useState(null)
  const [XIni, setXIni] = useState(null) 
  const [YIni, setYIni] = useState(null)

  useEffect(() => {setNewBoard(getBoardConfig)},[pieces])

  function getBoardConfig(){
    const boardState = [];

    for (let y =7; y >= 0; y--){
      for (let x =0; x < XAxis.length; x++){
        const colorOfTheSquare = y + x;
        let pieceImg;
        let color;
        let type;
  
        pieces.forEach(piece => {
          if(piece.XPosition === x && piece.YPosition === y){
            pieceImg = piece.pieceImg;
            color = piece.color
            type = piece.type
          }
        })
  
        boardState.push(
          <Squares 
            key={`${x},${y}`}
            colorOfTheSquare={colorOfTheSquare} 
            pieceImg={pieceImg}
            color={color}
            type={type}
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
      setActivePiece(element)  
      const _squareSize = element.offsetWidth
      setSquareSize(_squareSize);
      setCoordinateX(Math.floor((event.clientX - chessboard.offsetLeft) / _squareSize))
      setCoordinateY(Math.abs(Math.ceil((event.clientY - chessboard.offsetTop -(_squareSize * 8)) / _squareSize )))
      setXIni(event.clientX);
      setYIni(event.clientY);
    }
  }

  function movePiece(event){
    if (!activePiece) { 
      return 
    }
    
    const x = 100 * (event.clientX - XIni) / squareSize;
    const y = 100 * (event.clientY - YIni) / squareSize;
      
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

  function dropPiece(event){
    const chessboard = chessBoardRef.current
    
    if (activePiece){
      const newX = Math.floor((event.clientX - chessboard.offsetLeft) / squareSize) 
      const newY = Math.abs(Math.ceil((event.clientY - chessboard.offsetTop -8*squareSize) / squareSize))
      
      const currentPiece = pieces.find(piece => piece.XPosition === coordinateX && piece.YPosition === coordinateY)
      const attackedPiece = pieces.find(piece => piece.XPosition === newX && piece.YPosition === newY)
      const validMove = isValidMove(coordinateX, coordinateY, newX, newY, currentPiece.type, currentPiece.color, myColor, newBoard)
      
      if (currentPiece && validMove){
        console.log(currentPiece.type)
        console.log(currentPiece.color)
        console.log(newY)

        if (isAPromotionMoviment(currentPiece, newY)){
          promotePawn(attackedPiece, newX, newY)
        } else {
          updateBoard(attackedPiece, newX, newY)
        }
      } else {
        resetPiece(activePiece)
      }
      setActivePiece(null)
    }
  }

  function isAPromotionMoviment(currentPiece, newY){
    if (currentPiece.type === 'Pawn'){
      if ( currentPiece.color === 'White' && newY === 7){
        return true
      }

      if ( currentPiece.color === 'Black' && newY === 0){
        return true
      }
    }
    
    return false
  }

  function resetPiece(activePiece){
    activePiece.style.transform = `translate(0%, 0%)`
  }

  function updateBoard(attackedPiece, newX, newY){
    setPieces(pieces => {
          return pieces.map(
            piece => {
            if (piece === attackedPiece){
              piece = {...piece, XPosition: null, YPosition: null }
              return piece
            }
            
            if (piece.XPosition === coordinateX && piece.YPosition === coordinateY){
              piece = {...piece, XPosition: newX, YPosition: newY }
            }

            return piece
          })
        })
  }

  function promotePawn(attackedPiece, newX, newY){
    setPieces(pieces => {
      return pieces.map(
        piece => {
          if (piece === attackedPiece){
              piece = {...piece, XPosition: null, YPosition: null }
              return piece
          }
            
          if (piece.XPosition === coordinateX && piece.YPosition === coordinateY){
              const color = piece.color
              piece = {...piece, XPosition: newX, YPosition: newY, type: 'Queen', pieceImg: `assets/${color}Queen.png`}
          }

         return piece
        }
      )
    })
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