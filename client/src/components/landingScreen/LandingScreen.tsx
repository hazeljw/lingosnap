import React from 'react';
import './styles.css';
import { Box, Button, IconButton, TextField } from '@mui/material';
import { Socket } from 'socket.io-client';
import { mapLanguageToFlag } from '../common/mappers';
import { Language } from '../common/enums';
import UserAvatar from '../common/userAvatar';
import MainTitle from '../common/MainTitle';

const avatarOptions = ['/avatars/avatarOne.svg', '/avatars/avatarTwo.svg', '/avatars/avatarThree.svg', '/avatars/avatarFour.svg', '/avatars/chef.svg'];

const getRandomAvatar = () => {
  return avatarOptions[Math.floor(Math.random()*avatarOptions.length)];
}

function LandingScreen({socket}: {socket:Socket}) {
    const [name, setName] = React.useState("Guest"+Math.floor(Math.random()*1000));
    const [selectedLanguage, setSelectedLanguage] = React.useState(Language.Spanish);
    const [selectedAvatar, setSelectedAvatar] = React.useState(getRandomAvatar());

    const [enteredGameCode, setEnteredGameCode] = React.useState("");

    const handleHostNewGame = () => {
      socket.emit('host_new_room', {name, selectedLanguage, selectedAvatar});
    }

    const handleJoinGame = () => {
      socket.emit('join_room', {name, room: enteredGameCode, selectedLanguage, selectedAvatar});
    }

    const languages = Object.values(Language);

  return (
    <Box className="LandingScreen flexCenter" gap={3} flexDirection={'column'}>

        <MainTitle />


        <Box className="flexCenter contentBox" gap={1}>
          <Box>
            Pick a language:
          </Box>
          {languages.map((language, index) => {

            return (
              <IconButton className={selectedLanguage === language ? 'selectedIcon' : ''} key={index} aria-label={language} color="primary" onClick={() => {setSelectedLanguage(language)}}>
                {mapLanguageToFlag(language)}
              </IconButton>
            )
          })}
        </Box>

        <Box className="flexCenter contentBox" flexDirection={'column'} gap={3} width={'fit-content'}>
          <Box className="flexCenter"   gap={1} >
            <UserAvatar name={name} selectedAvatar={selectedAvatar} selectedLanguage={selectedLanguage} />
            <TextField id="outlined-basic" label="Name" variant="outlined" value={name} color={"secondary"} onChange={(v) => {setName(v.target?.value)}} />
          </Box>

          <Box className="flexCenter" gap={1}>
              <TextField id="outlined-basic" label="Game Code" variant="outlined" color={"secondary"} value={enteredGameCode} onChange={(v)=>{setEnteredGameCode(v.target?.value)}} />
              <Button variant="contained" color="primary" onClick={handleJoinGame} disabled={enteredGameCode?.length !== 6}>Join Game</Button>
          </Box>

          <Button variant="contained" color="primary" onClick={handleHostNewGame}>Host New Game</Button>



        </Box>

        <a href="https://github.com/hazeljw/lingosnap" target="_blank" rel="noreferrer">
          <Box style={{display: 'flex', alignItems: 'center', gap: 4, color: 'white', position: 'absolute', bottom: '20px', left: '20px'}}>
            <img src="/github-logo.svg" alt="github-logo" width={24} height={24} />
            hazeljw
          </Box>
        </a>
    </Box>
  );
}

export default LandingScreen;
