import React from 'react';
import './styles.css';
import { Avatar, Badge, Box, Button, IconButton, TextField } from '@mui/material';
import { Socket } from 'socket.io-client';
import RainbowTitle from './RainbowTitle';
import { mapLanguageToFlag } from '../common/mappers';
import { Language } from '../common/enums';
import UserAvatar from '../common/userAvatar';

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

        <div className="main-title">
          <div className="title-word">

            <div className="title-letter">L</div>
            <div className="title-letter">i</div>
            <div className="title-letter">n</div>
            <div className="title-letter">g</div>
            <div className="title-letter">o</div>
          </div>
          <div className="title-word">
            <div className="title-letter">S</div>
            <div className="title-letter">N</div>
            <div className="title-letter">A</div>
            <div className="title-letter">P</div>
          </div>

        </div>


        <Box className="flexCenter" gap={1}>
          <Box>
            Pick a language:
          </Box>
          {languages.map((language, index) => {

            return (
              <IconButton key={index} aria-label={language} color="primary" onClick={() => {setSelectedLanguage(language)}}>
                {mapLanguageToFlag(language)}
              </IconButton>
            )
          })}

        </Box>

        <Box className="flexCenter"  gap={1} >
          <UserAvatar name={name} selectedAvatar={selectedAvatar} selectedLanguage={selectedLanguage} />
          <TextField id="outlined-basic" label="Name" variant="outlined" value={name} onChange={(v) => {setName(v.target?.value)}} />
        </Box>

        

        <Box className="flexCenter" gap={1}>
            <TextField id="outlined-basic" label="Game Code" variant="outlined" value={enteredGameCode} onChange={(v)=>{setEnteredGameCode(v.target?.value)}} />
            <Button variant="contained" color="primary" onClick={handleJoinGame} disabled={enteredGameCode?.length !== 6}>Join Game</Button>
        </Box>

        <Button variant="contained" color="primary" onClick={handleHostNewGame}>Host New Game</Button>

    </Box>
  );
}

export default LandingScreen;
