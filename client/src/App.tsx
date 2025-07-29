import React, { useEffect } from 'react';
import './App.css';
import LandingScreen from './components/landingScreen/LandingScreen';
import Lobby from './components/lobby/Lobby';
import io from 'socket.io-client';
import GameOn from './components/game/GameOn';
import ResultsScreen from './components/postGame/ResultsScreen';
import { RoomData, ContentMode, Language, contentData, User } from '@lingosnap/shared';
import { Box } from '@mui/material';
import GameCard from './components/game/card/GameCard';

const randomListOfData = [...contentData.data, ...contentData.data]

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
      setRoomData(data?.roomData)
      setGameStatus(GameStatus.InGame);
    });

    socket.on('game_update', (data) => {
      setRoomData(data?.roomData)

      // check for game over
      if(data?.roomData?.gameState?.currentRound > data?.roomData?.gameState?.totalRounds) {
        setGameStatus(GameStatus.GameOver);
      }
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

  const handleStartGame = (rounds:number, timePerRound:number, contentMode:ContentMode) => {
    // TODO: start the game for everyone in the room
    //socket.emit('start_game', {roomData});
    socket.emit('start_game', {roomData, rounds, timePerRound, contentMode});

    //setGameStatus(GameStatus.InGame);
  }

  const handleCorrectAnswer = () => {
    socket.emit('correct_answer', {roomData});
  }

  const handleTimeOut = () => {
    // TODO: If the user is the host, end the round.
    if(roomData?.hostId === socket.id) {
      socket.emit('ran_out_of_time', {roomData});
    }
  }

  const isHost = roomData?.hostId === socket.id;
  const userData = roomData?.users?.find((user:User) => user.id === socket.id)

  const handleReturnToLobby = () => {
    socket.emit('return_to_lobby', {roomData});
  }

  const handleUserChangeSelectedLanguage = (language:Language) => {
    socket.emit('player_changed_language', {roomData, language, user: userData});
  }

  return (
    <div className="App">

      { gameStatus === GameStatus.NotJoined && <LandingScreen socket={socket} />}

      { gameStatus === GameStatus.InLobby && <Lobby roomData={roomData} handleLeaveLobby={handleLeaveLobby} handleStartGame={handleStartGame} isHost={isHost} userData={userData} handleUserChangeSelectedLanguage={handleUserChangeSelectedLanguage} />}

      { gameStatus === GameStatus.InGame && <GameOn socket={socket} roomData={roomData} handleLeaveLobby={handleLeaveLobby} handleCorrectAnswer={handleCorrectAnswer} handleTimeOut={handleTimeOut} />}
      
      { gameStatus === GameStatus.GameOver && <ResultsScreen userId={socket.id} roomData={roomData} isHost={isHost} handleReturnToLobby={handleReturnToLobby}/>}
      
      { gameStatus !== GameStatus.InGame && (
        <Box style={{
          position: 'absolute',
          zIndex: -1,
          top: 1,
          opacity: 0.2,
          width: '100%',
          height: '100%',
          overflow: 'hidden'
        }}>
          <GameCard cardHeight={window.innerHeight} cardWidth={window?.innerWidth ?? 2000} difficulty={50} items={randomListOfData} size={0.5}/>
        </Box>
      )}

      { gameStatus !== GameStatus.InGame && (
        <Box style={{
          position: 'absolute',
          zIndex: -1,
          top: 1,
          opacity: 0.2,
          width: '100%',
          height: '100%',
          overflow: 'hidden'
        }}>
          <GameCard cardHeight={window.innerHeight} cardWidth={window?.innerWidth ?? 2000} difficulty={50} items={contentData.data} size={2}/>
        </Box>
      )}


      {gameStatus !== GameStatus.InGame && (
        <a href="https://github.com/hazeljw/lingosnap" target="_blank" rel="noreferrer">
          <Box style={{display: 'flex', alignItems: 'center', gap: 4, color: 'white', position: 'absolute', bottom: '20px', left: '20px'}}>
            <img src="/github-logo.svg" alt="github-logo" width={24} height={24} />
            hazeljw
          </Box>
        </a>
      )}

    </div>
  );
}

export default App;
