export interface User {
    id: string;
    name: string;
    isHost: boolean;
}

export interface RoomData {
    roomCode: string;
    hostId?: string;
    users?: User[];
    gameState?: any;
}