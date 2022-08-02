import styled from 'styled-components';

export default function ChessBoard() {

  const XAxis = ['a','b','c','d','e','f','g','h']
  const YAxis = [1,2,3,4,5,6,7,8]
  let board = []

  for (let x =0; x < XAxis.length; x++){
    for (let y =0; y < XAxis.length; y++){
      board.push(
        <span>
          {XAxis[x]}{YAxis[y]}
        </span>
      )
    }
  };

  return(
  <Container>
    {board}
  </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 500px;
  height: 500px;
  background-color: #EEDAB6;
`