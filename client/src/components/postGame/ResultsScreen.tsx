import React from "react";
import { Box, Button } from "@mui/material";
import UserAvatar from "../common/userAvatar";
import './styles.css';
import MainTitle from "../common/MainTitle";
import { RoomData } from "@lingosnap/shared";
import GameSummary from "./gameSummary/GameSummary";


function ResultsScreen({userId, roomData, handleReturnToLobby, isHost}:{userId?:string, roomData?:RoomData, handleReturnToLobby:()=>void, isHost:boolean}) {
  if(!roomData) {
      return <div>ERROR: Room data not found</div>
  }

  const sortedUsers = roomData.users.sort((a, b) => {
    const aScore = a.score ?? 0;
    const bScore = b.score ?? 0;
    return bScore - aScore
  });

  return (
    <Box display={'flex'} flexDirection={'column'} width={'100%'} alignItems={'center'} mt={2} gap={2}>
      <MainTitle />
      <h1 className="noBackgroundText">Results</h1>

      <Box display={'flex'} flexDirection={'row'} alignItems={'center'} gap={5} width={'100%'} justifyContent={'space-around'}>
        <GameSummary roomData={roomData} userId={userId} />

        <Box maxWidth={'500px'} width={'100%'}>
            {sortedUsers.map((player, index) => {
              const evenIndex = index % 2 === 0;
              const isLast = index === sortedUsers.length - 1;
              const isFirst = index === 0;
              const borderRadius = `${isFirst ? '16px 16px' : '0 0'} ${isLast ? '16px 16px' : '0 0'}`;

              return (
                <Box key={player.id} className={`playerResult ${evenIndex ? 'even' : 'odd'}`} borderRadius={borderRadius}>
                  
                  <Box className='flexCenter'>
                    <UserAvatar selectedAvatar={player.avatar} selectedLanguage={player.selectedLanguage} name={player.name} />
                    
                    <Box className='positionText'>#{index+1}</Box>

                  </Box>

                  <Box className='playerName' flexGrow={100} ml={2}>{player.name}</Box>

                  <Box className='playerScore' justifySelf={'flex-end'}>{player.score}</Box>
                </Box>
              )
            })}

        </Box>


      </Box>



        {isHost && <Box>
        <Button variant="contained" color="primary" onClick={handleReturnToLobby}>Back to lobby</Button>
      </Box>}
      
    </Box>
  );
}

export default ResultsScreen