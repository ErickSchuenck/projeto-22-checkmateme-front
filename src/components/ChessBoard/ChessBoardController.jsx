import { useCallback, useState } from 'react';
import styled from 'styled-components';
import ChessBoard from './ChessBoard';
import MoveSelector from '../MoveSelector';
import CurrentPiece from '../CurrentPiece';
import { ContextProvider } from './chessContext';
import useEventListener from '../../hooks/useEventListener';

const initialPosition = [
  ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
  ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
  ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r']
];

export default function ChessBoardController() {
  // Logic component for the chess board
  const [position, setPosition] = useState([initialPosition]);
  const [moves, setMoves] = useState([]);
  const [currentMove, setCurrentMove] = useState(0);
  const [activeSquare, setActiveSquare] = useState([-1, -1]);
  const [cursorPosition, setCursorPosition] = useState({ top: 0, left: 0 });
  const [cursorStartPos, setCursorStartPos] = useState({
    top: 0,
    left: 0
  });

  const onMouseMove = e => {
    setCursorPosition({ top: e.clientY, left: e.clientX });
  };

  const onMouseUp = e => {
    // No square selected
    if (activeSquare[0] === -1 && activeSquare[1] === -1) {
      return;
    }

    // No piece on square
    if (
      position[position.length - 1][activeSquare[0]][activeSquare[1]] === ''
    ) {
      return;
    }

    setActiveSquare([-1, -1]);

    const { clientX, clientY } = e;

    const squareDiff = [
      Math.round((cursorStartPos.top - clientY) / 58),
      Math.round((cursorStartPos.left - clientX) / 58)
    ];

    if (squareDiff[0] === 0 && squareDiff[1] === 0) {
      return; // It's the same square
    }

    const newSquare = [
      activeSquare[0] - squareDiff[0],
      activeSquare[1] - squareDiff[1]
    ];

    if (
      newSquare[0] < 0 ||
      newSquare[1] < 0 ||
      newSquare[0] > 7 ||
      newSquare[1] > 7
    ) {
      return; // Outside of the board
    }

    // Check

    setPosition(oldPos => {
      const newPos = structuredClone(oldPos[oldPos.length - 1]);

      // Remove piece from currentSquare\
      newPos[newSquare[0]][newSquare[1]] =
        newPos[activeSquare[0]][activeSquare[1]];
      newPos[activeSquare[0]][activeSquare[1]] = '';

      return [...oldPos, newPos];
    });

    setMoves(oldMoves => {
      const newMove = { from: [...activeSquare], to: [...newSquare] };

      return [...oldMoves, newMove];
    });

    setCurrentMove(move => move + 1);
  };

  // Event handler utilizing useCallback ...
  // ... so that reference never changes.
  const onKeyDown = useCallback(
    ({ keyCode }) => {
      console.log('keyDown', keyCode);
      // Left Arrow
      if (keyCode === 37 && currentMove > 0) {
        setCurrentMove(oldMove => oldMove - 1);
      } else if (keyCode === 39 && currentMove < moves.length) {
        setCurrentMove(oldMove => oldMove + 1);
      }
    },
    [setCurrentMove, currentMove, moves]
  );
  // Add event listener using our hook
  useEventListener('keydown', onKeyDown);
  useEventListener('mouseup', onMouseUp);

  return (
    <ContextProvider
      contextValue={{
        activeSquare,
        setActiveSquare,
        position,
        setPosition,
        moves,
        setMoves,
        currentMove,
        setCurrentMove,
        cursorPosition,
        setCursorPosition,
        cursorStartPos,
        setCursorStartPos,
        onMouseMove
      }}
    >
      <Wrapper>
        <ChessBoard />
        <MoveSelector />
      </Wrapper>

      {activeSquare[0] !== -1 && activeSquare[1] !== -1 && <CurrentPiece />}
    </ContextProvider>
  );
}

const Wrapper = styled.div`
  display: flex;
  gap: 30px;
`;
