import React from "react";
import { RoomData } from "../../../../common/types";
import { Box, Button } from "@mui/material";


function ResultsScreen({roomData, handleReturnToLobby, isHost}:{roomData?:RoomData, handleReturnToLobby:()=>void, isHost:boolean}) {
    if(!roomData) {
        return <div>ERROR: Room data not found</div>
    }

  return (
    <div>
      <h1>Results</h1>

      <Box className='podiumContainer'>
        <Box className='podium secondPlace'></Box>
        <Box className='podium firstPlace'></Box>
        <Box className='podium thirdPlace'></Box>
      </Box>

      <Box>
        Results:
        <ul>
          {roomData.users.map((player) => {
            return <li key={player.id}>{player.name} got {player.score}</li>
          })}
        </ul>
      </Box>

        {/* TODO: lock to only the host */}

        {isHost && <Box>
        <Button variant="contained" color="primary" onClick={handleReturnToLobby}>Back to lobby</Button>
      </Box>}
      
    </div>
  );
}

export default ResultsScreen