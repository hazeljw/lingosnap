import React from 'react';
import './styles.css';
import { Box, Button, TextField } from '@mui/material';
import { RoomData } from '../../../../common/types';
import UserAvatar from '../common/userAvatar';
import MainTitle from '../common/MainTitle';

function Lobby({roomData, handleLeaveLobby, handleStartGame}: {roomData?: RoomData, handleLeaveLobby: () => void, handleStartGame: () => void}) {

  return (
    <Box className="LandingScreen flexCenter" gap={3} flexDirection={'column'}>
        <MainTitle />

        <Box className="title contentBox">Game code: {roomData?.roomCode}</Box>

        <Box className="flexSimple">
            <Box className="leftBox contentBox" mr={2} height={"100%"}>
                <Box>Players:</Box>
                <Box>
                {roomData?.users?.map((user, index) => {

                    return (
                        <Box className="flexSimple" gap={1} key={index + user?.id} mb={1}>

                            <UserAvatar name={user?.name} selectedAvatar={user.avatar} selectedLanguage={user.selectedLanguage} />

                            <Box>
                                {user?.name}{user?.isHost ? ':Host' : ''}
                            </Box>
                        </Box>
                    )
                })}
                </Box>
            </Box>

            <Box className="rightBox contentBox" height={"100%"} display={'flex'} justifyContent={'space-between'} flexDirection={'column'}>
                
                <Box>Settings</Box>
                <TextField id="outlined-basic" label="Rounds" variant="outlined" color={'secondary'} value={3} />
                <TextField id="outlined-basic" label="Time per round" variant="outlined" color={'secondary'}  value={30} />
                <Button variant="contained" color="primary" onClick={handleStartGame}>Start Game</Button>
                
            </Box>

        </Box>


        <Box mt={2}>
            <Button variant="contained" color="primary" onClick={handleLeaveLobby}>Leave</Button>

        </Box>

    </Box>
  );
}

export default Lobby;
