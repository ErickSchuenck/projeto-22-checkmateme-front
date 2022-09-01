import { useContext } from 'react';
import { ChessContext } from './chessContext';
import styled from 'styled-components';
import Piece from '../Piece';

export default function Square({ pos, type, piece }) {
  const {
    activeSquare,
    setActiveSquare,
    setCursorStartPos,
    setCursorPosition
  } = useContext(ChessContext);

  const onMouseDown = e => {
    setActiveSquare(pos);
    setCursorStartPos({ top: e.clientY, left: e.clientX });
    setCursorPosition({ top: e.clientY, left: e.clientX });
  };
  // Renderer component for chess square

  return (
    <SquareDiv onMouseDown={onMouseDown} className={type}>
      {piece !== '' && (
        <Piece
          type={piece}
          active={activeSquare[0] === pos[0] && activeSquare[1] === pos[1]}
        />
      )}
    </SquareDiv>
  );
}

const SquareDiv = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: center;
  user-select: none;
  &.odd {
    background-color: #eedab6;
  }

  &.even {
    background-color: #c7a37b;
  }
`;
