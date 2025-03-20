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
const MAX_ROTATION_SPEED = 12


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


    function init() {
        const maxSpeed = MAX_SPEED
        const minSpeed = MIN_SPEED

        // assign directions, spaces, vectors etc to each object.
        const details:GameCardItem[] = items?.map((item)=>{

            const motion = {
                xSpeed:  cardWidth / (Math.random() * (maxSpeed - minSpeed) + minSpeed),
                ySpeed:  cardHeight / (Math.random() * (maxSpeed - minSpeed) + minSpeed),
                zSpeed:  disableRotation ? 0 : Math.random() * (MAX_ROTATION_SPEED - MIN_ROTATION_SPEED) + MIN_ROTATION_SPEED
            }
            
            if(isCharacterMode) {
                const characterItem = item as CharacterItem
                return {
                    item,
                    icon: <Box fontSize={fontSize+'px'}>{characterItem.character}</Box>,
                    motion,
                    size: fontSize+'px'
                }
            }

            const image = new Image();
            image.src = (item as ContentItem).image;
            const width = image.width*size + 'px'

            return {
                item,
                motion,
                icon: <Box>
                    <img 
                        src={(item as ContentItem).image} 
                        alt={(item as ContentItem).word} 
                        width={width} 
                        className={(item as ContentItem).isPixel ? 'pixelImage' : ''}
                    />
                </Box>,
                size: width
            }

        }) ?? []

        return details
    }

    useEffect(() => {
        const values = init()
        setCardItems(values) 
    },[items])

    const fontSize = BASE_FONT_SIZE*size

    return (
        <Box height={cardHeight} width={cardWidth}>
            {cardItems.map((cardItem)=> {
                return (
                    <Item item={cardItem} containerHeight={cardHeight+'px'} containerWidth={`${cardWidth}px`} />
                )
            })}
        </Box>
    )
}

export default GameCard