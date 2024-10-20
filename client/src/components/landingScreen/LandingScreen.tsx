import React from 'react';
import './styles.css';
import { Avatar, Box, Button, TextField } from '@mui/material';
import { Socket } from 'socket.io-client';

function LandingScreen({socket}: {socket:Socket}) {
    const [name, setName] = React.useState("Guest"+Math.floor(Math.random()*1000));

    const [enteredGameCode, setEnteredGameCode] = React.useState("");

    const handleHostNewGame = () => {
      socket.emit('host_new_room', {name});
    }

    const handleJoinGame = () => {
      socket.emit('join_room', {name, room: enteredGameCode});
    }

  return (
    <Box className="LandingScreen flexCenter" gap={3} flexDirection={'column'}>
        <Box className="title">LingoSnap</Box>

        <Box className="flexCenter"  gap={1} >
            <Avatar alt={name?.length ? name : "LingoSnap"} src="/static/images/avatar/1.jpg" />
            <TextField id="outlined-basic" label="Name" variant="outlined" value={name} onChange={(v) => {setName(v.target?.value)}} />
        </Box>

        <Button variant="contained" color="primary" onClick={handleHostNewGame}>Host New Game</Button>

        <Box className="flexCenter" gap={1}>
            <TextField id="outlined-basic" label="Game Code" variant="outlined" value={enteredGameCode} onChange={(v)=>{setEnteredGameCode(v.target?.value)}} />
            <Button variant="contained" color="primary" onClick={handleJoinGame} disabled={enteredGameCode?.length !== 6}>Join Game</Button>
        </Box>

    </Box>
  );
}

export default LandingScreen;
