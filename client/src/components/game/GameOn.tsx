import React, { useEffect } from 'react';
import './styles.css';
import { Avatar, Box, Button, TextField } from '@mui/material';
import { RoomData } from '../../../../common/types';
import { GameContentData, getItemsForCard } from './helpers';

function GameOn({roomData, handleLeaveLobby}: {roomData?: RoomData, handleLeaveLobby: () => void}) {
    const [itemData, setItemData] = React.useState<GameContentData>();

    // TODO: update dynamically as game progresses
    const itemsPerCard = 7;


    useEffect(() => {   
        const response = getItemsForCard(itemsPerCard);
        setItemData(response);
        console.log(response);
    },[]);

    // TODO: update dynamically
    const cardHeight = 400
    const cardWidth = 400
    const border = 64

    return (
        <Box>

            <Box className="header" display='flex'>
                <Button variant="contained" color="primary" onClick={handleLeaveLobby}>Leave Game</Button>
                <Box>
                    CODE: {roomData?.roomCode}
                </Box>
            </Box>


            <Box>
                <Box className="cardContainer">
                    <Box className="card" width={cardWidth} height={cardHeight}>
                        {itemData?.cardOne.map((item, index) => {
                            // place randomly within the card
                            let x = Math.floor(Math.random() * cardWidth - border) + border;
                            let y = Math.floor(Math.random() * cardHeight - border) + border;

                            if(x > cardWidth - border){
                                x = x - border
                            }
                            if(y > cardHeight - border){
                                y = y - border
                            }

                            return (
                                <Box key={index} style={{position: 'absolute', top: y, left: x}} className='item'>
                                    <img src={item.image} alt={item.word} width={"64px"}/>
                                </Box>
                            )
                            
                        })}

                    </Box>
                    <Box className="card" width={cardWidth} height={cardHeight} position={'relative'}>

                        {itemData?.cardTwo.map((item, index) => {
                            // place randomly within the card
                            let x = Math.floor(Math.random() * cardWidth - border) + border;
                            let y = Math.floor(Math.random() * cardHeight - border) + border;

                            if(x > cardWidth - border){
                                x = x - border
                            }
                            if(y > cardHeight - border){
                                y = y - border
                            }

                            return (
                                <Box key={index} style={{position: 'absolute', top: y, left: x}} className='item'>
                                    <img src={item.image} alt={item.word} width={"64px"}/>
                                </Box>
                            )
                            
                        })}

                    </Box>
                </Box>


            </Box>
        </Box>
    );
}

export default GameOn;