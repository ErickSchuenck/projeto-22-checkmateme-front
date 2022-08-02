import { BrowserRouter, Routes, Route } from "react-router-dom";
import StartingScreen from "./pages/StartingScreen/StartingScreen";
import ChessBoard from "./components/ChessBoard/ChessBoard.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<StartingScreen />} />
        <Route path='/testRoute' element={<ChessBoard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
