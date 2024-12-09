import { Box, IconButton } from "@mui/material";
import React from "react";
import { mapLanguageToFlag } from "./mappers";
import { Language } from "./enums";

function LanguageSelectMenu({selectedLanguage, setSelectedLanguage}:{selectedLanguage?:Language, setSelectedLanguage:(v:Language)=>void}) {
  const languages = Object.values(Language);

  return (
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
  );
}

export default LanguageSelectMenu;