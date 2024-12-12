import { CharacterItem, ContentItem } from "../common/types";

export interface GameContentData {
    cardOne: ContentItem[];
    cardTwo: ContentItem[];
    commonItem: ContentItem;
    allItems: ContentItem[];
}


export interface CharacterGameContentData {
    cardOne: CharacterItem[];
    cardTwo: CharacterItem[];
    commonItem: CharacterItem;
    allItems: CharacterItem[];
}