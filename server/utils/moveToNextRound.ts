// const { RoomData } = require('../types');
// const { getItemsForCard } = require('./getItemsForCard');
import { RoomData } from '../types';
import getItemsForCard from './getItemsForCard';


export default function moveToNextRound (roomData:RoomData) {
    if(!roomData.gameState) return roomData;

    roomData.gameState.currentRound += 1;

    if(roomData.gameState.currentRound > roomData.gameState.totalRounds) {
        // end the game

        // TODO: any relevant stuff here

    } else {
        // generate the game state
        const numberItemsPerCard = 10;
        const gameItems = getItemsForCard(numberItemsPerCard);
        const gameState = {
            ...roomData.gameState,
            ...gameItems,
            userIdsWithCorrectAnswerForRound: [],
            roundExpiryTimeUTC: new Date(Date.now() + 30000) // 30 seconds
        }

        roomData.gameState = gameState;
    }  


    return roomData;
}

