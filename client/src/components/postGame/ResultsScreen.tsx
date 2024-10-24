import React from "react";
import { RoomData } from "../../../../common/types";
import { Box, Button } from "@mui/material";
import UserAvatar from "../common/userAvatar";
import './styles.css';


function ResultsScreen({roomData, handleReturnToLobby, isHost}:{roomData?:RoomData, handleReturnToLobby:()=>void, isHost:boolean}) {
  if(!roomData) {
      return <div>ERROR: Room data not found</div>
  }

  const sortedUsers = roomData.users.sort((a, b) => {
    const aScore = a.score ?? 0;
    const bScore = b.score ?? 0;
    return bScore - aScore
  });

  return (
    <div>
      <h1>Results</h1>

      <Box className='podiumContainer'>
        <Box className='podium secondPlace'></Box>
        <Box className='podium firstPlace'></Box>
        <Box className='podium thirdPlace'></Box>
      </Box>

      <Box maxWidth={'500px'} borderRadius={'16px'}>
          {sortedUsers.map((player, index) => {
            const evenIndex = index % 2 === 0;
            return (
              <Box key={player.id} className={`playerResult ${evenIndex ? 'even' : 'odd'}`}>

                <UserAvatar selectedAvatar={player.avatar} selectedLanguage={player.selectedLanguage} name={player.name} />
                
                <Box className='positionText'>#{index+1}</Box>

                <Box className='playerName'>{player.name}</Box>

                <Box className='playerScore'>{player.score}</Box>
              </Box>
            )
          })}

      </Box>

        {isHost && <Box>
        <Button variant="contained" color="primary" onClick={handleReturnToLobby}>Back to lobby</Button>
      </Box>}
      
    </div>
  );
}

export default ResultsScreen