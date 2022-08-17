import axios from "axios"
import { convertNotationFromAppToApi } from "./convertNotation";

export default async function sendMoveToServer(previousX, previousY, newX, newY) {
  const { from, to } = convertNotationFromAppToApi(previousX, previousY, newX, newY)
  const body = { from, to }
  let computerMove;
  try {
    axios.post("http://localhost:5000/move", body)
      .then((response) => { computerMove = response.data.pop() })
      .catch(error => console.log(error));
  } catch (error) {
    alert("Erro de servidor");
    console.log(error.response);
  }
  return computerMove
}