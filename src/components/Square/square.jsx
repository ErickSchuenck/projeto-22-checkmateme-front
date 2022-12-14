import styled from 'styled-components';

export default function Squares({colorOfTheSquare, pieceImg}) {
    return(
    <Square color={colorOfTheSquare % 2 === 0 ? 'White' : 'Black'}>
      {pieceImg && <div className='Piece' style={{backgroundImage: `url(${pieceImg})`}}/>}  
    </Square>)
}

const Square = styled.div`
  width: 58px;
  height: 58px;
  background-color: ${props => props.color === 'Black' ? '#EEDAB6' : '#C7A37B' };
  display: flex;
  justify-content: center;
  align-items: center;
  .Piece{
    cursor: grab;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 60px;
  }
  .Piece:active{
    cursor: grabbing;
  }
`