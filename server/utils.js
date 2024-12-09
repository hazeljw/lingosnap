const data = require('./data/contentData.json');

const generateRoomCode = () => {
    return Math.random().toString(36).substr(2, 6).toUpperCase();
}

const getItemsForCard = (numItemsPerCard, numCards=2) => {
    // The total unique items to be retrieved
    const totalNumberOfItems = (numItemsPerCard * numCards) - (numCards-1);

    const itemOptions = data.data


    if(totalNumberOfItems > itemOptions.length){
        throw new Error('Not enough items to choose fromm')
    }

    // select random items from the data
    const randomItems = [];
    const randomIndices = [];
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


const moveToNextRound = (roomData) => {
    if(!roomData.gameState) return roomData;

    roomData.gameState.currentRound += 1;

    if(roomData.gameState.currentRound > roomData.gameState.totalRounds) {
        // end the game

        // TODO: any relevant stuff here

    } else {
        // generate the game state

        const timeForRound = roomData.gameState.timePerRound ?? 30000;
        const numberItemsPerCard = 10;
        const gameItems = getItemsForCard(numberItemsPerCard);
        const gameState = {
            ...roomData.gameState,
            ...gameItems,
            userIdsWithCorrectAnswerForRound: [],
            roundExpiryTimeUTC: new Date(Date.now() + timeForRound)
        }

        roomData.gameState = gameState;
    }  


    return roomData;
}


module.exports = { generateRoomCode, getItemsForCard, moveToNextRound };