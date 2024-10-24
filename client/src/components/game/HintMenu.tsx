import React, { useEffect } from 'react';
import './styles.css';
import { Box, Dialog } from '@mui/material';
import data from '../../configs/contentData.json';
import { Language } from '../common/enums';
import Grid from '@mui/material/Grid2';
import { mapLanguageToFlag } from '../common/mappers';

function HintMenu({handleClose, chosenLanguage, open}: {handleClose: () => void, chosenLanguage: Language, open: boolean}) {

    const words = data.data;
    words.sort(() => Math.random() - 0.5);

    return (
        <Dialog open={open} onClose={handleClose}>
            <Box padding={3}>
                <Box className='subtitle'>{mapLanguageToFlag(chosenLanguage)}{' '}Reference words:</Box>

                <Grid container spacing={2} mt={1}>
                    {words.map((word, index) => {
                        return (
                            <Grid size={{ xs: 6, md: 4, lg: 3 }}>
                                <Box  key={index}className='wordItem' >
                                    <img src={word.image} alt={word.word} width={"32px"} className='pixelImage'/>
                                    {word.languages[chosenLanguage]}
                                </Box>
                            </Grid>
                        )
                    })}
                </Grid> 
            </Box>
        </Dialog>
    );
}

export default HintMenu;