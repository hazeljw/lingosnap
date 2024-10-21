export interface User {
    id: string;
    name: string;
    isHost: boolean;
    selectedLanguage?: Language;
    score?: number;
}

export interface RoomData {
    roomCode: string;
    hostId?: string;
    users?: User[];
    gameState?: GameState;
}

export interface GameState {
    totalRounds: number;
    currentRound: number;
    cardOne: ContentItem[];
    cardTwo: ContentItem[];
    commonItem: ContentItem;
    allItems: ContentItem[];
    userIdsWithCorrectAnswerForRound: string[]
    roundExpiryTimeUTC: Date; // time when the round ends if not everyone has guessed the common item
}

export enum Language {
    English = 'english',
    Spanish = 'spanish',
    French = 'french',
    German = 'german',
    Italian = 'italian',
    Dutch = 'dutch',
    Portuguese = 'portuguese',
    Japanese = 'japanese',
    Korean = 'korean',
    Finnish = 'finnish',
    TeReo = 'tereo',
}

export interface ContentItem {
    word: string;
    languages: {
        [Language.English]: string;
        [Language.Spanish]: string;
        [Language.French]: string;
        [Language.German]: string;
        [Language.Italian]: string;
        [Language.Dutch]: string;
        [Language.Portuguese]: string;
        [Language.Japanese]: string;
        [Language.Korean]: string;
        [Language.Finnish]: string;
        [Language.TeReo]: string;
    };
    tags: string[];
    image: string;
    funFact: string;
    congrats: string;
    sorry: string;
}