import { Language } from "./enums";

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