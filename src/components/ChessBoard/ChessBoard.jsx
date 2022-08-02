import styled from 'styled-components';

export default function ChessBoard() {

  const XAxis = ['a','b','c','d','e','f','g','h']
  const YAxis = ['1','2','3','4','5','6','7','8']
  let board = []

  for (let x =0; x < XAxis.length; x++){
    for (let y =0; y < XAxis.length; y++){
      board.push(
        <div className='square'>
          <h1>
            {XAxis[x]}{YAxis[y]}
          </h1>
        </div>
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
  display: grid;
  grid-template-columns: repeat(8, 60px);
  grid-template-rows: repeat(8, 60px);
  color: #854a4a;
  background-color: #EEDAB6;
  max-width:480px;
  margin: 40px; // FIXME
  .square{
    background-color: #C7A37B;
    width: 58px;
    height: 58px;
    h1{
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
    }
  }
`