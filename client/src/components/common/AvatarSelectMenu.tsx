import React from "react";
import { Avatar, Box } from "@mui/material";
import { AVATAR_OPTIONS } from "./mappers";

interface AvatarSelectMenuProps {
  selectedAvatar?: string, 
  handleSelectedAvatar: (v:string) => void
}

function AvatarSelectMenu({
  selectedAvatar,
  handleSelectedAvatar
}:AvatarSelectMenuProps) {

  return (
    <Box display="flex" gap={2} flexWrap={'wrap'} maxWidth={'min(80vw, 500px)'} padding={1}>
        {AVATAR_OPTIONS.map((option, index)=> {
            return (
                <Avatar 
                    alt={"LingoSnap Avatar " + index} 
                    src={option}  
                    sx={{ width: 56, height: 56, border: `3px solid ${selectedAvatar === option ? '#6e47ba' : 'white'}` }} 
                    onClick={() => handleSelectedAvatar(option)}
                />
            )
        })}
    </Box>
  );
}

export default AvatarSelectMenu;