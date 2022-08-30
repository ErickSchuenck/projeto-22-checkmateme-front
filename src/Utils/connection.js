import axios from 'axios';
import { convertNotationFromAppToApi } from './convertNotation';

export async function sendMoveToServer(previousX, previousY, newX, newY) {
  const { from, to } = convertNotationFromAppToApi(
    previousX,
    previousY,
    newX,
    newY
  );
  const body = { move: `${from}${to}` };
  let computerMove;
  try {
    console.log(body);
    await axios
      .post('http://localhost:5000/move', body)
      .then(response => {
        computerMove = response.data;
      })
      .catch(error => console.log(error));
  } catch (error) {
    alert('Erro de servidor');
    console.log(error.response);
  }
  return computerMove;
}

export async function startGame() {
  try {
    await axios
      .post('http://localhost:5000/create')
      .catch(error => console.log(error));
  } catch (error) {
    alert('Erro de servidor');
    console.log(error.response);
  }
}
