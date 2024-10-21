import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import LandingScreen from './components/landingScreen/LandingScreen';
import Lobby from './components/lobby/Lobby';
import io from 'socket.io-client';
import {RoomData} from '../../common/types';
import GameOn from './components/game/GameOn';

enum GameStatus {
  NotJoined='NotJoined',
  InLobby='InLobby',
  InGame='InGame'
}

const socket = io('http://localhost:3002');

function App() {
  const [gameStatus, setGameStatus] = React.useState<GameStatus>(GameStatus.NotJoined);
  const [roomData, setRoomData] = React.useState<RoomData | undefined>(undefined);

  const handleRoomJoined = (data:{roomCode:string, hostId:string, roomData:RoomData}) => {
    setRoomData(data.roomData);
    setGameStatus(GameStatus.InLobby);
  }

  useEffect(() => {
    socket.on('room_join_success', (data) => {
      handleRoomJoined(data)
    });

    socket.on('user_host_success', (data) => {
      handleRoomJoined(data)
    });

    socket.on('room_data_update', (data) => {
      setRoomData(data?.roomData)
    });

    socket.on('game_start', (data) => {
      console.log('game_start got!', data);
      setRoomData(data?.roomData)
      setGameStatus(GameStatus.InGame);
    });

  }, [socket]);

  const handleLeaveLobby = () => {
    socket.emit('leave_room', {roomData});
    setGameStatus(GameStatus.NotJoined);
    setRoomData(undefined);
  }

  const handleStartGame = () => {
    // TODO: start the game for everyone in the room
    //socket.emit('start_game', {roomData});
    socket.emit('start_game', {roomData});

    //setGameStatus(GameStatus.InGame);
  }


  return (
    <div className="App">

      { gameStatus === GameStatus.NotJoined && <LandingScreen socket={socket} />}

      { gameStatus === GameStatus.InLobby && <Lobby roomData={roomData} handleLeaveLobby={handleLeaveLobby} handleStartGame={handleStartGame}/>}

      { gameStatus === GameStatus.InGame && <GameOn roomData={roomData} handleLeaveLobby={handleLeaveLobby} />}
      
    </div>
  );
}

export default App;
