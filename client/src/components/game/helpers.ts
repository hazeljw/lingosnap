import { CharacterItem, ContentItem } from "@lingosnap/shared";

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