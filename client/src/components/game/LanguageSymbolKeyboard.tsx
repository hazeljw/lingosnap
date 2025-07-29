import React from "react";
import './styles.css';
import { Button, Box } from '@mui/material';
import { Language } from '@lingosnap/shared';


const getSymbolsForLanguage = (language: Language):string[] => {
    const LONG_VOWELS = ['ā','ē','ī','ō','ū'];

    switch (language) {
        case Language.Spanish:
            return ['á','é','í','ó','ú','ñ'];
        case Language.French:
            return ['è','é','œ'];
        case Language.German:
            return ['ä','ö'];
        case Language.Italian:
            return ['è']
        case Language.Portuguese:
            return ['ã','ç','ú','é'];
        case Language.Japanese:
            return LONG_VOWELS
        case Language.Korean:
            return ['튀김']
        case Language.Finnish:
            return ['ä','ö']
        case Language.TeReo:
            return LONG_VOWELS
        default:
            return [];
    }
}

const SymbolKeyboard = ({language, onSymbolClick}: {language: Language, onSymbolClick: (symbol: string) => void}) => {
    const symbols = getSymbolsForLanguage(language);

    return (
        <Box className='symbol-keyboard'>
            {symbols.map((symbol) => (
                <Button key={symbol} onClick={() => onSymbolClick(symbol)} size='large' variant="contained" color="primary" >{symbol}</Button>
            ))}
        </Box>
    )
}

export default SymbolKeyboard;




