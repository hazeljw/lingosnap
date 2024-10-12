import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import LandingScreen from './components/landingScreen/LandingScreen';
import Lobby from './components/lobby/Lobby';
import io from 'socket.io-client';

enum GameStatus {
  NotJoined,
  InLobby,
  InGame
}

const socket = io('http://localhost:3002');

function App() {
  const [gameStatus, setGameStatus] = React.useState(GameStatus.NotJoined);

  const [roomCode, setRoomCode] = React.useState("");

  useEffect(() => {
    socket.on('room_join_success', (data) => {
      console.log(data);
      setRoomCode(data.roomCode);
    });

    socket.on('user_host_success', (data) => {
      console.log(data);
      setRoomCode(data.roomCode);
    });

  }, [socket]);

  return (
    <div className="App">

      { gameStatus === GameStatus.NotJoined && <LandingScreen socket={socket} />}


      { gameStatus === GameStatus.NotJoined && <Lobby roomCode={roomCode} />}
      
    </div>
  );
}

export default App;
