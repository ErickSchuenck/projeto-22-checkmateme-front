import Square from './Square';
import styled from 'styled-components';
import { useContext } from 'react';
import { ChessContext } from './chessContext';

export default function ChessBoard() {
  const { position, currentMove } = useContext(ChessContext);
  // Renderer component for chess board

  return (
    <Container>
      {position[currentMove]?.map((row, i) =>
        row.map((square, j) => (
          <Square
            key={`${i}${j}`}
            pos={[i, j]}
            type={(i + j) % 2 === 0 ? 'odd' : 'even'}
            piece={square}
          />
        ))
      )}
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 60px);
  grid-template-rows: repeat(8, 60px);
  color: #854a4a;
  max-width: 464px;
  left: 10px;
  &.locked {
    pointer-events: none;
  }
`;
