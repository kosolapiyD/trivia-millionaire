import { Route, Routes } from 'react-router-dom';
import './app.scss';
import FinalScorePage from './pages/FinalScorePage';
import GameProcessPage from './pages/GameProcessPage';
import StartPage from './pages/StartPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/game-process" element={<GameProcessPage />} />
        <Route path="/final-score" element={<FinalScorePage />} />
      </Routes>
    </div>
  );
}

export default App;
