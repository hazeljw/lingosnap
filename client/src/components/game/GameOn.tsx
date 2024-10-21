import React, { useEffect } from 'react';
import './styles.css';
import { Avatar, Box, Button, InputAdornment, TextField } from '@mui/material';
import { RoomData } from '../../../../common/types';
import { GameContentData, getItemsForCard } from './helpers';
import HintMenu from './HintMenu';
import { Language } from '../common/enums';
import { mapLanguageToFlag } from '../common/mappers';
import UserScore from './UserScore';

function GameOn({roomData, handleLeaveLobby}: {roomData?: RoomData, handleLeaveLobby: () => void}) {
    const [itemData, setItemData] = React.useState<GameContentData>();
    const [hintMenuOpen, setHintMenuOpen] = React.useState<boolean>(false);

    const [cardOnePositions, setCardOnePositions] = React.useState<{x: number, y: number}[]>([]);
    const [cardTwoPositions, setCardTwoPositions] = React.useState<{x: number, y: number}[]>([]);

    const [enteredAnswer, setEnteredAnswer] = React.useState<string>("");

    // TODO: get from user settings
    const chosenLanguage = Language.French;


    const handleSubmitAnswer = () => {
        // todo: check if answer is correct
        const correctAnswer = itemData?.commonItem?.languages[chosenLanguage];

        if(enteredAnswer?.toLowerCase() === correctAnswer?.toLowerCase()) {
            console.log("CORRECT");
            // handle correct answer
        } else {
            console.log("INCORRECT");
            // handle incorrect answer
            setEnteredAnswer("");
        }

    }

    // TODO: update dynamically as game progresses
    const itemsPerCard = 10;


    const assignPositionsForItems = (numItems:number):{x: number, y: number}[] => {
        const positions:{x: number, y: number}[] = []

        let attempts = 0;

        while(positions.length < numItems && attempts < 1000) {
            attempts++;

            // place randomly within the card
            let x = Math.floor(Math.random() * cardWidth - border) + border;
            let y = Math.floor(Math.random() * cardHeight - border) + border;

            if(x > cardWidth - border){
                x = x - border
            }
            if(y > cardHeight - border){
                y = y - border
            }

            // check if position is already taken
            if(positions.find((pos) => {
                const overlappingX = pos.x - x < 64 && pos.x - x > 0; // TODO: check overlapping logic
                const overlappingY = pos.y - y < 64 && pos.y - y > 0;

                return overlappingX && overlappingY
            })) {
                continue
            }

            positions.push({x, y})
        }

        return positions
    }


    useEffect(() => {   
        const response = getItemsForCard(itemsPerCard);

        //  generate postions for each item
        setCardOnePositions(assignPositionsForItems(response.cardOne.length));
        setCardTwoPositions(assignPositionsForItems(response.cardTwo.length));


        setItemData(response);
        console.log(response);
    }, []);

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
                        Round X of Y
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
                                    <Box key={index} style={{position: 'absolute', top: y, left: x}} className='item'>
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
                                    <Box key={index} style={{position: 'absolute', top: y, left: x}} className='item'>
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