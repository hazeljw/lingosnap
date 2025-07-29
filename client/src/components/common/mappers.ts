import { ContentMode, Language, contentData, animalsData, emojisData } from "@lingosnap/shared";

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
            return animalsData;
        case ContentMode.Food:
            return contentData;
        case ContentMode.Emojis:
            return emojisData;
        default:
            return contentData;
    }
}


export const mapContentModeToGameItemSize = (contentMode?: ContentMode) => {
    switch(contentMode) {
        case ContentMode.Animals:
            return 2; // used to be 0.8 with image size
        case ContentMode.Food:
            return 2;
        default:
            return 2;
    }
}


export const AVATAR_OPTIONS = [
    '/avatars/avatarOne.svg', 
    '/avatars/avatarTwo.svg', 
    '/avatars/avatarThree.svg', 
    '/avatars/avatarFour.svg', 
    '/avatars/chef.svg'
];
