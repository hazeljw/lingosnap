import React from "react";
import { mapLanguageToFlag } from "./mappers";
import { Language } from "./enums";
import { Avatar, Badge, Box } from "@mui/material";
import LanguageFlag from "./LanguageFlag";


function UserAvatar({name, selectedLanguage=Language.Spanish, selectedAvatar}: {name: string, selectedLanguage?: Language, selectedAvatar?: string}) {
  return (
    <Badge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        badgeContent={
            <Box style={{fontSize: 20}}>
              <LanguageFlag language={selectedLanguage} width={20} />
            </Box>
        }
    >
        <Avatar alt={name?.length ? name : "LingoSnap"} src={selectedAvatar}  sx={{ width: 56, height: 56 }}/>
    </Badge>
  );
}

export default UserAvatar;