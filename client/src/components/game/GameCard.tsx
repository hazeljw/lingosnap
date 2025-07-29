import React, { useEffect, useState } from 'react';
import './styles.css';
import { Box } from '@mui/material';
import { CharacterItem, ContentItem } from '@lingosnap/shared';
import Canvas from '../common/Canvas/Canvas';

interface GameCardProps {
    cardHeight: number;
    cardWidth: number;
    items?: ContentItem[] | CharacterItem[]
    difficulty: number; // a number between 0 and 100 representing how difficult the level should be.
    level?:number,
    size?:number
    isCharacterMode?: boolean
}

interface ItemWithPosition  {
    position:{x:number,y:number,rotation:number},
    movement:{vx:number, vy:number},
    item: ContentItem | CharacterItem,
    image?: HTMLImageElement
}

const MIN_SPEED = 0.01
const MAX_SPEED = 0.08

const BASE_FONT_SIZE = 20

const GameCard = ({items, cardHeight, cardWidth, difficulty, level, isCharacterMode=false, size=2}:GameCardProps) => {

    const [cardItems, setCardItems] = useState<ItemWithPosition[]>([])
    const [initTime, setInitTime] = useState<Date>(new Date())

    const fontSize = BASE_FONT_SIZE*size

    function init() {
        const maxSpeed = MAX_SPEED
        const minSpeed = MIN_SPEED

        // assign directions, spaces, vectors etc to each object.
        const details = items?.map((item)=>{

            const position:{x:number,y:number, rotation:number} = {
                x: Math.floor(Math.random() * cardWidth),
                y: Math.floor(Math.random() * cardHeight),
                rotation: Math.floor(Math.random() * (5)) * 90 // TODO: use this to set an initial rotation
            }

            // these are probably very very wrong
            const movement:{vx:number, vy:number} = {
                vx: Math.random() * (maxSpeed - minSpeed) + minSpeed,
                vy: Math.random() * (maxSpeed - minSpeed) + minSpeed,
            }

            
            if(isCharacterMode) {
                return {
                    item,
                    movement,
                    position
                }
            }

            const image = new Image();
            if(!!(item as ContentItem).image) {
                image.src = (item as ContentItem).image || "";
            }

            return {
                item,
                movement,
                position,
                image
            }

        }) ?? []

        return details
    }

    const findCoordinate = (origin:number, velocity:number, boundary:number, timeCount:number) => {
        const totalTravel = velocity * timeCount;

        const bo = boundary - origin

        // times it has bounced against a wall
        const N = Math.floor((totalTravel - bo) / boundary);

        // distance left after previous bounce
        const remaining = totalTravel - bo - (boundary * N)

        // if it has bounced an odd amount of times, it needs to go backward.
        if (N % 2 === 0) {
            // even
            return remaining
        } else {
            // odd
            return boundary - remaining
        }
    }
    
    const draw = (ctx:CanvasRenderingContext2D, count:number) => {
        const timeNow = new Date()

        const timeSinceStart = timeNow.getTime() - initTime.getTime();

        ctx.clearRect(0,0,ctx.canvas.width, ctx.canvas.height)
   
        ctx.fillStyle = 'black';
        ctx.font = `${fontSize}px sans-serif`;
        ctx.imageSmoothingEnabled = false;


        for(let i = 0; i < cardItems.length; i++) {
            // loop through and render
            const cardItem = cardItems[i]

            const imageHeight = cardItem.image ? cardItem.image.height*size : fontSize;
            const imageWidth = cardItem.image ? cardItem.image.width*size : fontSize;

            const x = findCoordinate(cardItem.position.x, cardItem.movement.vx, cardWidth - imageWidth, timeSinceStart)
            const y = findCoordinate(cardItem.position.y, cardItem.movement.vy, cardHeight - imageHeight, timeSinceStart)

            if(cardItem.image) {
                ctx.drawImage(cardItem.image, x, y, imageWidth, imageHeight);
            } else {
                const item = cardItem.item as CharacterItem
                ctx.fillText(item.character, x, y);
            }
            
        }
    }


    useEffect(() => {
        const values = init()
        setCardItems(values)
        setInitTime(new Date())
    },[items])

    return (
        <Box>
            <Canvas draw={draw} height={cardHeight} width={cardWidth}/>
        </Box>
    )
}

export default GameCard