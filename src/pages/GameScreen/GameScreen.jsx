import { useEffect } from 'react';
import styled from 'styled-components';
import ChessBoard from '../../components/ChessBoard';
import { startGame } from '../../Utils/connection';

export default function GameScreen() {
  useEffect(() => {
    startGame();
  }, []);

  return (
    <Container>
      <ChessBoard />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-image: url('assets/background.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;
