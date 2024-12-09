import React, { useEffect } from 'react';
import './App.css';
import LandingScreen from './components/landingScreen/LandingScreen';
import Lobby from './components/lobby/Lobby';
import io from 'socket.io-client';
import GameOn from './components/game/GameOn';
import ResultsScreen from './components/postGame/ResultsScreen';
import { RoomData } from './components/common/types';

enum GameStatus {
  NotJoined='NotJoined',
  InLobby='InLobby',
  InGame='InGame',
  GameOver='GameOver'
}

const socket = io('https://lingosnap-server-78dfee2150c1.herokuapp.com/');
// const socket = io('http://localhost:3002');



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

    socket.on('game_update', (data) => {
      console.log('game_start got!', data);
      setRoomData(data?.roomData)

      // check for game over
      if(data?.roomData?.gameState?.currentRound > data?.roomData?.gameState?.totalRounds) {
        setGameStatus(GameStatus.GameOver);
      }

      //setGameStatus(GameStatus.InGame);
    });

    socket.on('return_to_lobby', (data) => {
      setRoomData(data?.roomData)
      setGameStatus(GameStatus.InLobby);
    });

  }, [socket]);

  const handleLeaveLobby = () => {
    socket.emit('leave_room', {roomData});
    setGameStatus(GameStatus.NotJoined);
    setRoomData(undefined);
  }

  const handleStartGame = (rounds:number, timePerRound:number) => {
    // TODO: start the game for everyone in the room
    //socket.emit('start_game', {roomData});
    socket.emit('start_game', {roomData, rounds, timePerRound});

    //setGameStatus(GameStatus.InGame);
  }

  const handleCorrectAnswer = () => {
    socket.emit('correct_answer', {roomData});
  }

  const handleTimeOut = () => {
    console.log("handling timeout")
    // TODO: If the user is the host, end the round.
    if(roomData?.hostId === socket.id) {
      socket.emit('ran_out_of_time', {roomData});
    }
  }

  const isHost = roomData?.hostId === socket.id;

  const handleReturnToLobby = () => {
    socket.emit('return_to_lobby', {roomData});
  }

  return (
    <div className="App">

      { gameStatus === GameStatus.NotJoined && <LandingScreen socket={socket} />}

      { gameStatus === GameStatus.InLobby && <Lobby roomData={roomData} handleLeaveLobby={handleLeaveLobby} handleStartGame={handleStartGame} isHost={isHost}/>}

      { gameStatus === GameStatus.InGame && <GameOn socket={socket} roomData={roomData} handleLeaveLobby={handleLeaveLobby} handleCorrectAnswer={handleCorrectAnswer} handleTimeOut={handleTimeOut} />}
      
      { gameStatus === GameStatus.GameOver && <ResultsScreen roomData={roomData} isHost={isHost} handleReturnToLobby={handleReturnToLobby}/>}

    </div>
  );
}

export default App;
