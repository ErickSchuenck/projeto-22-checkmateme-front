import styled from 'styled-components';
import StyledButton from '../../components/Button/styledButton';

export default function StartingScreen() {
  return(
  <Container>
    <StyledButton/>
  </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  /* background-color: black */
`