import React from 'react';
import './styles.css';
import { Box, Dialog } from '@mui/material';
import { ContentMode, Language, CharacterItem, ContentItem, charactersData } from '@lingosnap/shared';
import Grid from '@mui/material/Grid2';
import { mapContentModeToData, mapLanguageToFlag } from '../common/mappers';

const MAX_ITEMS_DISPLAYED_BY_DEFAULT = 48;

interface HintMenuProps {
    handleClose: () => void,
    chosenLanguage: Language,
    open: boolean,
    contentMode?: ContentMode
    allItems?: ContentItem[] | CharacterItem[];
}

type CharacterData = {
    hiragana: CharacterItem,
    katakana: CharacterItem,
}

const CharacterModeHintGrid = ({contentMode}:{contentMode:ContentMode}) => {
    const characterData = charactersData.data

    return (
        <Grid container spacing={2} mt={1}>
            {characterData.map((item: CharacterData, index: number) => {
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



function HintMenu({
    handleClose, 
    chosenLanguage, 
    open, 
    contentMode=ContentMode.Food,
    allItems
}:HintMenuProps) {

    const isCharacterMode = [ContentMode.Hiragana, ContentMode.Katakana].includes(contentMode)

    let words:ContentItem[] = mapContentModeToData(contentMode).data;
    words.sort(() => Math.random() - 0.5);

    if(MAX_ITEMS_DISPLAYED_BY_DEFAULT < words.length) {
        // if the current content has more options than can be feasibly displayed, prioritise the items selected.

        let itemsToGrab = MAX_ITEMS_DISPLAYED_BY_DEFAULT - (allItems?.length ?? 0)
        
        if(itemsToGrab <= 0 && allItems?.length) {
            words = allItems as ContentItem[]
        } else if(allItems?.length) {
            words = [...words.slice(0, itemsToGrab), ...(allItems as ContentItem[])]
        }

        words.sort(() => Math.random() - 0.5);
    }
    

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
                                        {word.image ? (
                                            <img src={word.image} alt={word.word} width={"32px"} className='pixelImage'/>
                                        ) : `${word.symbol} `}
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