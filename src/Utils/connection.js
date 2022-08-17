import axios from "axios"
import convertNotation from "./convertNotation";

export default function sendMoveToServer(previousX, previousY, newX, newY) {
  const { from, to } = convertNotation(previousX, previousY, newX, newY)
  const body = { from, to }
  console.log(from, to)
  try {
    axios.post("http://localhost:5000/move", body)
      .then((response) => { console.log(response) })
      .catch(error => console.log(error));
  } catch (error) {
    alert("Erro de servidor");
    console.log(error.response);
  }
  return 'retorno de send move to server'
}