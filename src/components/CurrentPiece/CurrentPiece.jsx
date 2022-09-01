import React, { useContext } from 'react';

import styled from 'styled-components';
import { ChessContext } from '../ChessBoard/chessContext';

import Piece from '../Piece';

// import { Container } from './styles';

function CurrentPiece() {
  const { activeSquare, position, currentMove, cursorPosition } =
    useContext(ChessContext);

  const type = position[currentMove][activeSquare[0]][activeSquare[1]];
  return (
    <Wrapper>
      <Square
        style={{
          transform: `translate(calc(${cursorPosition.left}px - 50%),calc(${cursorPosition.top}px - 50%))}`
        }}
        left={cursorPosition.left}
        top={cursorPosition.top}
      >
        <Piece type={type} />
      </Square>
    </Wrapper>
  );
}

export default CurrentPiece;

const Wrapper = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
`;

// const Square = styled.div`
//   display: flex;
//   width: 60px;
//   height: 60px;
//   transform: ${({ left, top }) =>
//     `translate(calc(${left}px - 50%),calc(${top}px - 50%))}`};
// `;

const Square = styled.div.attrs(props => ({
  style: {
    transform: `translate(calc(${props.left}px - 50%),calc(${props.top}px - 50%))`
  }
}))`
  display: flex;
  width: 60px;
  height: 60px;
`;
