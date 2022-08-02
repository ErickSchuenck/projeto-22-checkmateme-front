import styled from 'styled-components';

export default function Squares({coordinateNumber, pieceImg}) {
  if (coordinateNumber % 2 === 0){
    return(<WhiteSquare color={'White'}>
      {
        pieceImg ? 
        <img alt='piece' src={pieceImg}/> 
        : 
        null
      }
    </WhiteSquare>)
    //should be refactored
  }
  else {
    return(<BlackSquare color={'Black'}>
      {
        pieceImg ? 
        <img alt='piece' src={pieceImg}/> 
        : 
        null
      }
    </BlackSquare>)
  }
}

const BlackSquare = styled.div`
  width: 58px;
  height: 58px;
  background-color: #C7A37B;
  display: flex;
  justify-content: center;
  align-items: center;
`

const WhiteSquare = styled.div`
  width: 58px;
  height: 58px;
  background-color: #EEDAB6; 
  display: flex;
  justify-content: center;
  align-items: center;
`
