export interface User {
    id: string;
    name: string;
    isHost: boolean;
    selectedLanguage?: Language;
    score?: number;
    avatar?: string;
}

export interface RoomData {
    roomCode: string;
    hostId?: string;
    users: User[];
    gameState?: GameState;
}

export interface GameState {
    totalRounds: number;
    currentRound: number;
    timePerRound: number;
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
        [Language.English]: string | string[];
        [Language.Spanish]: string | string[];
        [Language.French]: string | string[];
        [Language.German]: string | string[];
        [Language.Italian]: string | string[];
        [Language.Dutch]: string | string[];
        [Language.Portuguese]: string | string[];
        [Language.Japanese]: string | string[];
        [Language.Korean]: string | string[];
        [Language.Finnish]: string | string[];
        [Language.TeReo]: string | string[];
    };
    tags: string[];
    image?: string;
    symbol?: string;
    isPixel?: boolean;
    funFact: string;
    congrats: string;
    sorry: string;
}