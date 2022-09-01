import React, { useContext } from 'react';
import styled from 'styled-components';
import { ChessContext } from '../ChessBoard/chessContext';

function MoveSelector() {
  const { moves, setCurrentMove } = useContext(ChessContext);
  return (
    <Wrapper>
      <div className="title">TitleHere</div>
      <div className="content">
        {moves.map((move, idx) => (
          <div key={idx} onClick={() => setCurrentMove(idx + 1)}>
            {move.to}
          </div>
        ))}
      </div>
    </Wrapper>
  );
}

export default MoveSelector;

const Wrapper = styled.div`
  background-color: #312e2b;
  color: hsla(0, 0%, 100%, 0.65);
`;
