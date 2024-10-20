export interface User {
    id: string;
    name: string;
    isHost: boolean;
    selectedLanguage?: Language;
}

export interface RoomData {
    roomCode: string;
    hostId?: string;
    users?: User[];
    gameState?: any;
}

export enum Language {
    English = 'English',
    Spanish = 'Spanish',
    French = 'French',
    German = 'German',
    Italian = 'Italian',
    Dutch = 'Dutch',
    Portuguese = 'Portuguese',
    Japanese = 'Japanese',
    Korean = 'Korean',
    Finnish = 'Finnish',
    TeReo = 'Te Reo',
}