import React from 'react';
import './styles.css';
import { Box, Button, TextField } from '@mui/material';
import { RoomData } from '../../../../common/types';
import UserAvatar from '../common/userAvatar';
import MainTitle from '../common/MainTitle';


interface ILobbyProps {
    roomData?: RoomData;
    handleLeaveLobby: () => void;
    handleStartGame: (rounds:number, timePerRound:number) => void;
    isHost: boolean;
}

function Lobby({roomData, handleLeaveLobby, handleStartGame, isHost}:ILobbyProps) {
  const [rounds, setRounds] = React.useState(3);
  const [timePerRound, setTimePerRound] = React.useState(30);

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

            {isHost ? (
                <Box className="rightBox contentBox" height={"100%"} display={'flex'} justifyContent={'space-between'} flexDirection={'column'}>
                    <Box>Settings</Box>
                    <TextField type="number" id="outlined-basic" label="Rounds" variant="outlined" color={'secondary'} value={rounds} onChange={(v) => setRounds(parseInt(v.target.value))} />
                    <TextField type="number" id="outlined-basic" label="Time per round" variant="outlined" color={'secondary'} value={timePerRound} onChange={(v) => setTimePerRound(parseInt(v.target.value))}/>
                    <Button variant="contained" color="primary" onClick={() => handleStartGame(rounds, timePerRound)}>Start Game</Button>
                </Box>
            ) : (
                <Box className="rightBox contentBox" height={"100%"} display={'flex'} justifyContent={'space-between'} flexDirection={'column'}>
                    Waiting for host to start game
                </Box>
            )}

        </Box>


        <Box mt={2}>
            <Button variant="contained" color="primary" onClick={handleLeaveLobby}>Leave</Button>

        </Box>

    </Box>
  );
}

export default Lobby;
