import React from 'react';
import logo from './logo.svg';
import './styles.css';
import { Avatar, Box, Button, TextField } from '@mui/material';

function Lobby() {

    const gameCode = "1234";

    const handleStartGame = () => {
    }

  return (
    <Box className="Lobby flexCenter" gap={3} flexDirection={'column'}>
        <Box className="title">Game code: {gameCode}</Box>

        <Box className="flexCenter" >
            <Box className="leftBox">
                <Box>Players:</Box>
                <Box>

                <Box className="flexCenter"  gap={1} >
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    <TextField id="outlined-basic" label="Name" variant="outlined" />
                </Box>
                </Box>
            </Box>

            <Box className="rightBox">
                Settings

                <Box className="flexCenter" gap={2} flexDirection={'column'}>
                    <TextField id="outlined-basic" label="Rounds" variant="outlined" />
                    <TextField id="outlined-basic" label="Time per round" variant="outlined" />
                </Box>


                <Button variant="contained" color="primary" onClick={handleStartGame}>Start Game</Button>
            </Box>

        </Box>

    </Box>
  );
}

export default Lobby;
