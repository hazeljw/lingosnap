import React from 'react';
import logo from './logo.svg';
import './styles.css';
import { Avatar, Box, Button, TextField } from '@mui/material';
import { RoomData } from '../../../../common/types';

function Lobby({roomData, handleLeaveLobby, handleStartGame}: {roomData?: RoomData, handleLeaveLobby: () => void, handleStartGame: () => void}) {

  return (
    <Box className="Lobby flexCenter" gap={3} flexDirection={'column'}>
        <Box className="title">Game code: {roomData?.roomCode}</Box>

        <Box className="flexSimple" >
            <Box className="leftBox" mr={2}>
                <Box>Players:</Box>
                <Box>
                {roomData?.users?.map((user, index) => {

                    return (
                        <Box className="flexSimple" gap={1} key={index + user?.id}>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                            <Box>
                                {user?.name}:{user?.isHost ? 'Host' : ''}
                            </Box>
                        </Box>
                    )
                })}
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


        <Box>
            <Button variant="contained" color="primary" onClick={handleLeaveLobby}>Leave</Button>

        </Box>

    </Box>
  );
}

export default Lobby;
