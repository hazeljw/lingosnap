import React, { useState } from "react";
import { Language } from "./enums";
import { Avatar, Badge, Box, Popover } from "@mui/material";
import LanguageFlag from "./LanguageFlag";
import AvatarSelectMenu from "./AvatarSelectMenu";

interface UserAvatarProps {
  name: string, 
  selectedLanguage?: Language, 
  selectedAvatar?: string, 
  allowAvatarSelection?: boolean,
  setSelectedAvatar?: (v:string) => void;
}

function UserAvatar({
  name, 
  selectedLanguage=Language.Spanish, 
  selectedAvatar, 
  setSelectedAvatar
}:UserAvatarProps) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event:any) => {
    setAnchorEl(event.currentTarget);
  };


  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelectedAvatar = (selection:string) => {
    if(!!setSelectedAvatar) {
      setSelectedAvatar(selection);
    }
    handleClose();
  }

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        badgeContent={
            <Box style={{fontSize: 20}}>
              <LanguageFlag language={selectedLanguage} width={20} />
            </Box>
        }
      >
          <Avatar alt={name?.length ? name : "LingoSnap"} src={selectedAvatar}  sx={{ width: 56, height: 56 }} onClick={handleClick}/>
      </Badge>


      <Popover
        id={id}
        open={open && !!setSelectedAvatar}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <AvatarSelectMenu selectedAvatar={selectedAvatar} handleSelectedAvatar={handleSelectedAvatar}/>


      </Popover>
    </>

  );
}

export default UserAvatar;