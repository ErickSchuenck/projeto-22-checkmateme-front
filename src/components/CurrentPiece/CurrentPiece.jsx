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
      <Square left={cursorPosition.left} top={cursorPosition.top}>
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
  pointer-events: none;
`;

const Square = styled.div.attrs(props => ({
  style: {
    transform: `translate(calc(${props.left}px - 50%),calc(${props.top}px - 50%))`
  }
}))`
  display: flex;
  width: 60px;
  height: 60px;
  pointer-events: none;
`;
