import React from 'react';
import logo from './logo.svg';
import './App.css';
import LandingScreen from './components/landingScreen/LandingScreen';
import Lobby from './components/lobby/Lobby';

enum GameStatus {
  NotJoined,
  InLobby,
  InGame
}

function App() {
  const [gameStatus, setGameStatus] = React.useState(GameStatus.NotJoined);

  return (
    <div className="App">

      { gameStatus === GameStatus.NotJoined && <LandingScreen />}


      { gameStatus === GameStatus.NotJoined && <Lobby />}
      
    </div>
  );
}

export default App;
