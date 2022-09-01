import React from 'react';
import styled from 'styled-components';

function Piece({ type, active }) {
  return <PieceDiv className={`${type} ${active ? 'active' : ''}`} />;
}

export default Piece;

const PieceDiv = styled.div`
  flex: 1 1 auto;
  background-position: center;

  cursor: pointer;
  &.p {
    background-image: url('assets/WhitePawn.png');
  }

  &.P {
    background-image: url('assets/BlackPawn.png');
  }

  &.r {
    background-image: url('assets/WhiteRook.png');
  }

  &.R {
    background-image: url('assets/BlackRook.png');
  }

  &.b {
    background-image: url('assets/WhiteBishop.png');
  }

  &.B {
    background-image: url('assets/BlackBishop.png');
  }

  &.n {
    background-image: url('assets/WhiteKnight.png');
  }

  &.N {
    background-image: url('assets/BlackKnight.png');
  }

  &.k {
    background-image: url('assets/WhiteKing.png');
  }

  &.K {
    background-image: url('assets/BlackKing.png');
  }

  &.q {
    background-image: url('assets/WhiteQueen.png');
  }

  &.Q {
    background-image: url('assets/BlackQueen.png');
  }

  &.active {
    /* display: none; */
    background-color: rgba(241, 196, 15, 0.5);
    background-image: none;
  }
`;
