import data from '../client/src/configs/contentData.json';
import { ContentItem, RoomData } from '../common/types';


export const generateRoomCode = () => {
    return Math.random().toString(36).substr(2, 6).toUpperCase();
}


export interface GameContentData {
    cardOne: ContentItem[];
    cardTwo: ContentItem[];
    commonItem: ContentItem;
    allItems: ContentItem[];
}

export const getItemsForCard = (numItemsPerCard:number, numCards=2):GameContentData => {
    // The total unique items to be retrieved
    const totalNumberOfItems = (numItemsPerCard * numCards) - (numCards-1);

    const itemOptions = data.data


    if(totalNumberOfItems > itemOptions.length){
        throw new Error('Not enough items to choose fromm')
    }

    // select random items from the data
    const randomItems:any[] = [];
    const randomIndices:number[] = [];
    while(randomItems.length < totalNumberOfItems){
        const randomIndex = Math.floor(Math.random() * itemOptions.length);
        if(!randomIndices.includes(randomIndex)){
            randomItems.push(itemOptions[randomIndex]);
            randomIndices.push(randomIndex);
        }
    }


    // TODO: make dynamic to number of cards
    // divide the random items into cards
    const cardOne = randomItems.slice(0, numItemsPerCard);
    const cardTwo = randomItems.slice(numItemsPerCard-1);

    const commonItem = cardTwo[0];

    // randomise order of items in each card
    cardOne.sort(() => Math.random() - 0.5);
    cardTwo.sort(() => Math.random() - 0.5);

    return {
        cardOne,
        cardTwo,
        commonItem,
        allItems: randomItems
    }
}


export const moveToNextRound = (roomData:RoomData) => {
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