// TYPES SHARED WITH BE - KEEP IN SYNC
// TODO: export this as a package that both FE and BE can install

import { ContentMode, Language } from "./enums";

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
    gameState?: GameState | CharacterGameState;
}

export interface GameState {
    totalRounds: number;
    currentRound: number;
    timePerRound: number;
    contentMode: ContentMode;
    cardOne: ContentItem[];
    cardTwo: ContentItem[];
    commonItem: ContentItem;
    allItems: ContentItem[];
    userIdsWithCorrectAnswerForRound: string[]
    roundExpiryTimeUTC: Date; // time when the round ends if not everyone has guessed the common item
}

export interface CharacterGameState {
    totalRounds: number;
    currentRound: number;
    timePerRound: number;
    contentMode: ContentMode;
    cardOne: CharacterItem[];
    cardTwo: CharacterItem[];
    commonItem: CharacterItem;
    allItems: CharacterItem[];
    userIdsWithCorrectAnswerForRound: string[]
    roundExpiryTimeUTC: Date; // time when the round ends if not everyone has guessed the common item
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
    image?: string;
    symbol?: string;
    isPixel?: boolean;
    funFact: string;
    congrats: string;
    sorry: string;
}

export interface CharacterItem {
    character: string;
    sound: string;
    language: string;
}