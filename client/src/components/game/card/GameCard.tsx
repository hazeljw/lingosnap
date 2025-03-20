import React, { useEffect, useState } from 'react';
import { Box } from "@mui/material"
import Item, { GameCardItem } from "./Item"
import './styles.css';
import { CharacterItem, ContentItem } from '../../common/types';


interface GameCardProps {
    cardHeight: number;
    cardWidth: number;
    items?: ContentItem[] | CharacterItem[]
    difficulty: number; // a number between 0 and 100 representing how difficult the level should be.
    level?:number,
    size?:number
    isCharacterMode?: boolean
    disableRotation?: boolean
}

// in pixels per second
const MIN_SPEED = 20
const MAX_SPEED = 100

const MIN_ROTATION_SPEED = 1
const MAX_ROTATION_SPEED = 50


const BASE_FONT_SIZE = 20

const GameCard = ({
    items, 
    cardHeight, 
    cardWidth, 
    difficulty, 
    level, 
    isCharacterMode=false,
    disableRotation=false, 
    size=2
}:GameCardProps) => {
    const [cardItems, setCardItems] = useState<GameCardItem[]>([])

    
    const fontSize = BASE_FONT_SIZE*size



    function getNodeForContentItem(contentItem:ContentItem) {

        if(!!contentItem.image) {
            const image = new Image();
            image.src = contentItem.image;
            const width = image.width*size + 'px'
            const height = image.height*size + 'px'

            return {
                icon: <Box>
                    <img 
                        src={contentItem.image} 
                        alt={contentItem.word} 
                        width={width} 
                        className={contentItem.isPixel ? 'pixelImage' : ''}
                    />
                </Box>,
                size: Math.max(image.width*size, image.height*size)+'px',
                height,
                width
            }
        }

        if(!!contentItem.symbol) {
            return {
                icon: <Box fontSize={fontSize+'px'}>{contentItem.symbol}</Box>,
                size: fontSize+'px',
                width: fontSize+'px',
                height: fontSize+'px'
            }
        }

        // UNKNOWN content data shape
        return {
            icon: <Box></Box>,
            size: '10px',
            width: '10px',
            height: '10px'
        }

    }


    function init() {

        // assign directions, spaces, vectors etc to each object.
        const details:GameCardItem[] = items?.map((item)=>{
            const maxSpeed = MAX_SPEED
            const minSpeed = MIN_SPEED

            const motion = {
                xSpeed:  cardWidth / (Math.random() * (maxSpeed - minSpeed) + minSpeed),
                ySpeed:  cardHeight / (Math.random() * (maxSpeed - minSpeed) + minSpeed),
                zSpeed:  disableRotation ? 0 : Math.random() * (MAX_ROTATION_SPEED - MIN_ROTATION_SPEED) + MIN_ROTATION_SPEED,
                clockwise: Math.random() > 0.5
            }

            if(isCharacterMode) {
                const characterItem = item as CharacterItem
                return {
                    item,
                    icon: <Box fontSize={fontSize+'px'}>{characterItem.character}</Box>,
                    motion,
                    size: fontSize+'px',
                    width: fontSize+'px',
                    height: fontSize+'px'
                }
            }

            const nodeInfo = getNodeForContentItem(item as ContentItem)

            return {
                item,
                motion,
                ...nodeInfo
            }

        }) ?? []

        return details
    }

    useEffect(() => {
        const values = init()
        setCardItems(values) 
    },[items])

    return (
        <Box height={cardHeight} width={cardWidth} overflow={'none'}>
            {cardItems.map((cardItem)=> {
                return (
                    <Item item={cardItem} containerHeight={cardHeight+'px'} containerWidth={`${cardWidth}px`} />
                )
            })}
        </Box>
    )
}

export default GameCard