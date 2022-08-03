import styled from 'styled-components';
import Squares from '../Square/square';


const YAxis = ['8','7','6','5','4','3','2','1']
const XAxis = ['a','b','c','d','e','f','g','h']
const pieces = []
let board = []

for(let i =0; i<2; i++){
  const color = (i === 0 ? 'White' : 'Black')
  const YPosition = (i === 0 ? 7 : 0)
  pieces.push({pieceImg: `assets/${color}Rook.png`, XPosition: 0, YPosition})
  pieces.push({pieceImg: `assets/${color}Knight.png`, XPosition: 1, YPosition})
  pieces.push({pieceImg: `assets/${color}Bishop.png`, XPosition: 2, YPosition})
  pieces.push({pieceImg: `assets/${color}Queen.png`, XPosition: 3, YPosition})
  pieces.push({pieceImg: `assets/${color}King.png`, XPosition: 4, YPosition})
  pieces.push({pieceImg: `assets/${color}Bishop.png`, XPosition: 5, YPosition})
  pieces.push({pieceImg: `assets/${color}Knight.png`, XPosition: 6, YPosition})
  pieces.push({pieceImg: `assets/${color}Rook.png`, XPosition: 7, YPosition})
}

for (let i = 0; i < 8; i++){
  pieces.push(
    {
      pieceImg: 'assets/BlackPawn.png',
      XPosition: i,
      YPosition: 1,
    }
  )
}
for (let i = 0; i < 8; i++){
  pieces.push(
    {
      pieceImg: 'assets/whitePawn.png',
      XPosition: i,
      YPosition: 6,
    }
  )
}

let activePiece = null;

function grabPiece(event){
  const element = event.target;
  if (element.classList.contains('Piece')){
    const x = event.clientX -676;
    const y = event.clientY -338;
    element.style.position = 'absolute';
    element.style.left = `${x}px`
    element.style.top = `${y}px`
    activePiece = element;
  }
}

function movePiece(event){
  if (activePiece){
    const x = event.clientX -676;
    const y = event.clientY -338;
    activePiece.style.position = 'absolute';
    activePiece.style.left = `${x}px`
    activePiece.style.top = `${y}px`
  }
}

function dropPiece(event){
  if (activePiece){
    activePiece = null
    console.log('aqui', activePiece)
  }
}


export default function ChessBoard() {
  for (let y =0; y < YAxis.length; y++){
    for (let x =0; x < XAxis.length; x++){
      const coordinateNumber = y + x;
      let pieceImg;

      pieces.forEach(piece => {
        if(piece.XPosition === x && piece.YPosition === y){
          pieceImg = piece.pieceImg
        }
      })
      board.push(
        <Squares 
          key={`${YAxis},${XAxis}`}
          coordinateNumber={coordinateNumber} 
          pieceImg={pieceImg} 
        />
      )
    }
  }
  return(
  <Container 
    onMouseMove={event=> movePiece(event)} 
    onMouseDown={event => grabPiece(event)}
    onMouseUp={event => dropPiece(event)}
  >
    {board}
  </Container>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 58px);
  grid-template-rows: repeat(8, 58px);
  color: #854a4a;
  max-width:464px;
`