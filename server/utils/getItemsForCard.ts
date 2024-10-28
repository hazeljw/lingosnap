// const { GameContentData } = require('../types');
// const { data } = require('../../client/src/configs/contentData.json'); // Probably going to have to move this
import { GameContentData } from '../types';
import data from '../../client/src/configs/contentData.json';


export default function getItemsForCard(numItemsPerCard:number, numCards=2):GameContentData {
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

