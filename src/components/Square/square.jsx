import styled from 'styled-components';

export default function Squares({coordinateNumber, pieceImg}) {
  if (coordinateNumber % 2 === 0){
    return(
    <WhiteSquare color={'White'}>
      {pieceImg && <div className='Piece' style={{backgroundImage: `url(${pieceImg})`}}/>}  
    </WhiteSquare>)
  }
  
  else {
    return(
    <BlackSquare color={'Black'}>
       {pieceImg && <div className='Piece' style={{backgroundImage: `url(${pieceImg})`}}/>} 
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
  .Piece{
    cursor: pointer;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 60px;
  }
`

const WhiteSquare = styled.div`
  width: 58px;
  height: 58px;
  background-color: #EEDAB6; 
  display: flex;
  justify-content: center;
  align-items: center;
  .Piece{
    cursor: pointer;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 60px;
  }
`
