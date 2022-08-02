import styled from 'styled-components';

export default function ChessBoard() {

  
  const YAxis = ['8','7','6','5','4','3','2','1']
  const XAxis = ['a','b','c','d','e','f','g','h']
  let board = []

  for (let y =0; y < YAxis.length; y++){
    for (let x =0; x < XAxis.length; x++){
      const coordinateNumber = y + x;
      if (coordinateNumber % 2 === 0){
        board.push(
        <div className='square blackSquare'>
          <h1>
            {XAxis[x]}{YAxis[y]}
          </h1>
        </div>
      )
      }

      if (coordinateNumber % 2 !== 0){
        board.push(
        <div className='square whiteSquare'>
          <h1>
            {XAxis[x]}{YAxis[y]}
          </h1>
        </div>
      )
      }
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
  max-width:480px;
  margin: 40px; // FIXME
  .square{ 
    width: 58px;
    height: 58px;
    h1{
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
    }
  }
  .blackSquare{
    background-color: #C7A37B;  
  }
  .whiteSquare{
    background-color: #EEDAB6;
  }

`