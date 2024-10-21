import React, { useEffect } from 'react';
import './styles.css';
import { Avatar, Box, Button, InputAdornment, TextField } from '@mui/material';
import { RoomData } from '../../../../common/types';
import { GameContentData } from './helpers';
import HintMenu from './HintMenu';
import { Language } from '../common/enums';
import { mapLanguageToFlag } from '../common/mappers';
import UserScore from './UserScore';

function GameOn({roomData, handleLeaveLobby, handleCorrectAnswer}: {roomData?: RoomData, handleLeaveLobby: () => void, handleCorrectAnswer: () => void}) {
    const [itemData, setItemData] = React.useState<GameContentData>();
    const [hintMenuOpen, setHintMenuOpen] = React.useState<boolean>(false);

    const [cardOnePositions, setCardOnePositions] = React.useState<{x: number, y: number, rotate: number}[]>([]);
    const [cardTwoPositions, setCardTwoPositions] = React.useState<{x: number, y: number, rotate: number}[]>([]);

    const [enteredAnswer, setEnteredAnswer] = React.useState<string>("");

    // TODO: get from user settings
    const chosenLanguage = Language.French;


    const handleSubmitAnswer = () => {
        // todo: check if answer is correct
        const correctAnswer = itemData?.commonItem?.languages[chosenLanguage];

        if(enteredAnswer?.toLowerCase() === correctAnswer?.toLowerCase()) {
            console.log("CORRECT");

            handleCorrectAnswer();

            // handle correct answer

        } else {
            console.log("INCORRECT");
            // handle incorrect answer
            
        }

        setEnteredAnswer("");

    }

    const assignPositionsForItems = (numItems:number):{x: number, y: number, rotate:number}[] => {
        const positions:{x: number, y: number, rotate:number}[] = []

        let attempts = 0;

        while(positions.length < numItems && attempts < 1000) {
            attempts++;

            // place randomly within the card
            let x = Math.floor(Math.random() * cardWidth - border) + border;
            let y = Math.floor(Math.random() * cardHeight - border) + border;

            let rotate = Math.floor(Math.random() * (5)) * 90;

            if(x > cardWidth - border){
                x = x - border
            }
            if(y > cardHeight - border){
                y = y - border
            }

            // check if position is already taken
            if(positions.find((pos) => {

                const imageWidth = 100;

                const l1 = {x: x, y: y};
                const r1 = {x: x + imageWidth, y: y + imageWidth};
                const l2 = {x: pos.x, y: pos.y};
                const r2 = {x: pos.x + imageWidth, y: pos.y + imageWidth};


                 // If one rectangle is to the left of the other
                if (l1.x > r2.x || l2.x > r1.x)
                    return false;

                // If one rectangle is above the other
                if (r1.y > l2.y || r2.y > l1.y)
                    return false;

                console.log("COLLISION");

                return true;
            })) {
                continue
            }

            console.log("all good");

            positions.push({x, y, rotate})
        }

        return positions
    }

    useEffect(() => {
        console.log("Game state changed", roomData?.gameState);

        if(roomData?.gameState) {
            setItemData({
                cardOne: roomData?.gameState?.cardOne,
                cardTwo: roomData?.gameState?.cardTwo,
                commonItem: roomData?.gameState?.commonItem,
                allItems: roomData?.gameState?.allItems
            })

            setCardOnePositions(assignPositionsForItems(roomData?.gameState?.cardOne.length));
            setCardTwoPositions(assignPositionsForItems(roomData?.gameState?.cardTwo.length));
        }
    }, [roomData?.gameState])

    // TODO: update dynamically
    const cardHeight = 400
    const cardWidth = 400
    const border = 64

    return (
        <Box display={'flex'} justifyContent={'space-between'}>

            <Box>
                <Box className="header" display='flex'>
                    <Button variant="contained" color="primary" onClick={handleLeaveLobby}>Leave Game</Button>
                    <Box>
                        CODE: {roomData?.roomCode}
                    </Box>
                    <Box>
                        Round {roomData?.gameState?.currentRound} of {roomData?.gameState?.totalRounds}
                    </Box>
                </Box>


                <Box>
                    <Box className="cardContainer">
                        <Box className="card" width={cardWidth} height={cardHeight}>
                            {itemData?.cardOne.map((item, index) => {
                                // place randomly within the card
                                const x = cardOnePositions[index]?.x;
                                const y = cardOnePositions[index]?.y;


                                return (
                                    <Box key={index} style={{position: 'absolute', top: y, left: x, transform:`rotate(${cardOnePositions[index]?.rotate}deg)`}} className='item'>
                                        <img className='pixelImage' src={item.image} alt={item.word} width={"64px"}/>
                                    </Box>
                                )
                                
                            })}

                        </Box>
                        <Box className="card" width={cardWidth} height={cardHeight} position={'relative'}>

                            {itemData?.cardTwo.map((item, index) => {
                                // place randomly within the card
                                const x = cardTwoPositions[index]?.x;
                                const y = cardTwoPositions[index]?.y;

                                return (
                                    <Box key={index} style={{position: 'absolute', top: y, left: x, transform:`rotate(${cardTwoPositions[index]?.rotate}deg)`}} className='item'>
                                        <img className='pixelImage' src={item.image} alt={item.word} width={"64px"}/>
                                    </Box>
                                )
                                
                            })}

                        </Box>
                    </Box>

                    <Box>
                        <Box className="flexCenter" gap={1}>
                            <TextField 
                                id="outlined-basic" 
                                label="" 
                                variant="outlined" 
                                value={enteredAnswer} 
                                onChange={(v)=>{setEnteredAnswer(v.target?.value)}}
                                slotProps={{
                                    input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                        {mapLanguageToFlag(chosenLanguage)}
                                        </InputAdornment>
                                    ),
                                    onKeyDown: (event) => {
                                        const enterKeys = ['Enter', ' ']
                                        if (enterKeys.includes(event.key) && enteredAnswer?.length) {
                                            handleSubmitAnswer()
                                        }
                                      }
                                    },
                                }}
                                
                            />
                            <Button variant="contained" color="primary" onClick={handleSubmitAnswer} disabled={!enteredAnswer?.length}>Submit</Button>
                        </Box>
                        
                    </Box>
                </Box>
            </Box>


            <Box className="rightSideBar"  style={{backgroundColor: 'lightGreen'}} display={'flex'} flexDirection={'column'} justifyContent={'space-between'}>

                <Box>
                    Players:

                    <Box>

                        {roomData?.users?.map((user, index) => {
                            return (
                                <UserScore user={user} position={1}/>
                            )
                        })}
                    </Box>



                </Box>

                <Box>
                    <Button variant="contained" color="primary" onClick={() => {setHintMenuOpen(true)}}>Hint</Button>
                </Box>

            </Box>



            <HintMenu open={hintMenuOpen} handleClose={() => {setHintMenuOpen(false)}} chosenLanguage={chosenLanguage}/>
        </Box>
    );
}

export default GameOn;