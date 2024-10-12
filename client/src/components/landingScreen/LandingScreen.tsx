import React from 'react';
import logo from './logo.svg';
import './styles.css';
import { Avatar, Box, Button, TextField } from '@mui/material';

function LandingScreen() {

    const handleHostNewGame = () => {
    }

    const handleJoinGame = () => {
    }

  return (
    <Box className="LandingScreen flexCenter" gap={3} flexDirection={'column'}>
        <Box className="title">LingoSnap</Box>

        <Box className="flexCenter"  gap={1} >
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            <TextField id="outlined-basic" label="Name" variant="outlined" />
        </Box>

        <Button variant="contained" color="primary" onClick={handleHostNewGame}>Host New Game</Button>

        <Box className="flexCenter" gap={1}>
            <TextField id="outlined-basic" label="Game Code" variant="outlined" />
            <Button variant="contained" color="primary" onClick={handleJoinGame}>Join Game</Button>
        </Box>

    </Box>
  );
}

export default LandingScreen;
