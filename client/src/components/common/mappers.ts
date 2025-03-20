import { ContentMode, Language } from "./enums";
import data from '../../configs/contentData.json';
import animals from '../../configs/animals.json';
import emojis from '../../configs/emojiMode.json';

export const mapLanguageToFlag = (language: Language) => {
    switch(language){
        case Language.English:
            return '🇬🇧';
        case Language.Spanish:
            return '🇪🇸';
        case Language.French:
            return '🇫🇷';
        case Language.German:
            return '🇩🇪';
        case Language.Italian:
            return '🇮🇹';
        case Language.Dutch:
            return '🇳🇱';
        case Language.Portuguese:
            return '🇵🇹';
        case Language.Japanese:
            return '🇯🇵';
        case Language.Korean:
            return '🇰🇷';
        case Language.Finnish:
            return '🇫🇮';
        case Language.TeReo:
            return '🇳🇿'; // TODO: get a te reo emoji
    }
}

export const mapContentModeToData = (contentMode: ContentMode) => {
    switch(contentMode) {
        case ContentMode.Animals:
            return animals;
        case ContentMode.Food:
            return data;
        case ContentMode.Emojis:
            return emojis;
        default:
            return data;
    }
}


export const mapContentModeToGameItemSize = (contentMode?: ContentMode) => {
    switch(contentMode) {
        case ContentMode.Animals:
            return 0.8;
        case ContentMode.Food:
            return 2;
        default:
            return 2;
    }
}