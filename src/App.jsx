import { BrowserRouter, Routes, Route } from "react-router-dom";
import StartingScreen from "./pages/StartingScreen/StartingScreen";
import GameScreen from "./pages/StartingScreen/GameScreen";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<StartingScreen />} />
        <Route path='/GameScreen' element={<GameScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
