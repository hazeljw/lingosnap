import React from 'react';
import './styles.css';
import { Box, Dialog } from '@mui/material';
import { ContentMode, Language } from '../common/enums';
import Grid from '@mui/material/Grid2';
import { mapContentModeToData, mapLanguageToFlag } from '../common/mappers';
import characterModeJson from '../../configs/characterMode.json';

interface HintMenuProps {
    handleClose: () => void,
    chosenLanguage: Language,
    open: boolean,
    contentMode?: ContentMode
}

const CharacterModeHintGrid = ({contentMode}:{contentMode:ContentMode}) => {
    const characterData = characterModeJson.data

    return (
        <Grid container spacing={2} mt={1}>
            {characterData.map((item, index) => {
                const itemData = contentMode === ContentMode.Hiragana ? item.hiragana : item.katakana
                return (
                    <Grid size={{ xs: 5, sm: 3, md: 2, lg: 2 }}>
                        <Box key={index} className='wordItem' >
                            <span className='character'>{itemData.character}</span>
                            {itemData.sound}
                        </Box>
                    </Grid>
                )
            })}
        </Grid> 
    )
}



function HintMenu({handleClose, chosenLanguage, open, contentMode=ContentMode.Food}:HintMenuProps) {

    const isCharacterMode = [ContentMode.Hiragana, ContentMode.Katakana].includes(contentMode)

    const words = mapContentModeToData(contentMode).data;
    words.sort(() => Math.random() - 0.5);

    return (
        <Dialog open={open} onClose={handleClose}>
            <Box padding={3}>
                <Box className='subtitle'>
                    {isCharacterMode ? `${mapLanguageToFlag(Language.Japanese)} ${contentMode} Reference:` : `${mapLanguageToFlag(chosenLanguage)} Reference words:`}    
                </Box>

                <Grid container spacing={2} mt={1}>
                    { isCharacterMode ? <CharacterModeHintGrid contentMode={contentMode} /> :
                        words.map((word, index) => {
                            return (
                                <Grid size={{ xs: 6, md: 4, lg: 3 }}>
                                    <Box  key={index}className='wordItem' >
                                        <img src={word.image} alt={word.word} width={"32px"} className='pixelImage'/>
                                        {word.languages[chosenLanguage]}
                                    </Box>
                                </Grid>
                            )
                        })
                    }
                </Grid> 
            </Box>
        </Dialog>
    );
}

export default HintMenu;