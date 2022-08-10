import React from 'react'
import styled from 'styled-components';

export default function StyledButton({ text, onclick }) {
  if (!text) {
    text = 'vazio'
  }

  return (
    <FlexBootButton onClick={onclick}>
      <div className='wrapper'>
        <div className='button'>
          <p className='big-text'>
            {text}
          </p>
          <div className='decoration-square'>
          </div>
        </div>
      </div>
    </FlexBootButton>
  )
}

const FlexBootButton = styled.div`
  .wrapper{
    cursor: pointer;
    position: relative;
    height: 45px;
    width: 154px;
    margin: 10px;
  }
  .button{
    height: 40px;
    width: 150px;
    background-color: black;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    transition-duration: 0.5s;
    color: white;
    border: 1px solid black;
  }
  .button p{
    margin: 0;
    font-family: 'Roboto', sans-serif;;
    font-size: 20px;
    transition-duration: 0.5s;
  }
  .decoration-square{
    height: 40px;
    width: 151px;
    border: 1px solid black;
    top: 2px;
    left: 1px;
    position: absolute;
    z-index: 0;
  }
  .button:hover{
    background-color: var(--fundo);
    color: black;
    
  }
  .button p:hover{
    transform: scale(1.05);
  }
  /* .decoration-square:hover{
    background-color: var(--fundo);
    z-index: -1;
  } */
`