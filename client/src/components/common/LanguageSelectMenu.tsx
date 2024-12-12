import { Box, IconButton } from "@mui/material";
import React from "react";
import { Language } from "./enums";
import LanguageFlag from "./LanguageFlag";

function LanguageSelectMenu({selectedLanguage, setSelectedLanguage}:{selectedLanguage?:Language, setSelectedLanguage:(v:Language)=>void}) {
  const languages = Object.values(Language);

  return (
    <Box className="flexCenter contentBox" gap={1} flexWrap={'wrap'}>
        <Box>
        Pick a language:
        </Box>
        {languages.map((language, index) => {

        return (
            <IconButton 
              className={selectedLanguage === language ? 'selectedIcon' : ''} 
              key={index} aria-label={language} color="primary" 
              onClick={() => {setSelectedLanguage(language)}}
              style={{width: '45px', height: '45px'}}
            >
             <LanguageFlag language={language} />
            </IconButton>
        )
        })}
    </Box>
  );
}

export default LanguageSelectMenu;