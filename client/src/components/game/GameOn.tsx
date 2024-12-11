import React, { useEffect } from 'react';
import './styles.css';
import { Box, Button, InputAdornment, TextField } from '@mui/material';
import { GameContentData } from './helpers';
import HintMenu from './HintMenu';
import { Language } from '../common/enums';
import { mapLanguageToFlag } from '../common/mappers';
import UserScore from './UserScore';
import TimerBar from './TimerBar';
import { Socket } from 'socket.io-client';
import MainTitle from '../common/MainTitle';
import SymbolKeyboard from './LanguageSymbolKeyboard';
import { RoomData } from '../common/types';
import GameCard from './GameCard';
import LanguageFlag from '../common/LanguageFlag';

const ANSWER_INPUT_ID = 'answer-input-id'

interface GameOnProps {
    roomData?: RoomData;
    handleLeaveLobby: () => void;
    handleCorrectAnswer: () => void;
    handleTimeOut: () => void;
    socket: Socket;
}

function GameOn({roomData, handleLeaveLobby, handleCorrectAnswer, handleTimeOut, socket}: GameOnProps) {
    const [itemData, setItemData] = React.useState<GameContentData>();
    const [hintMenuOpen, setHintMenuOpen] = React.useState<boolean>(false);

    const [celebration, setCelebration] = React.useState<string>('');
    const [missedAnswerText, setMissedAnswerText] = React.useState<string>("");

    const [enteredAnswer, setEnteredAnswer] = React.useState<string>("");

    const chosenLanguage = roomData?.users?.find((user) => user.id === socket.id)?.selectedLanguage ?? Language.Spanish;

    useEffect(() => {
    
        socket.on('out_of_time', (data) => {

            const roomData:RoomData = data?.roomData

            setMissedAnswerText(`Answer was ${roomData?.gameState?.commonItem?.languages[chosenLanguage]}! ` + roomData?.gameState?.commonItem?.sorry);

            // set time out to clear
            setTimeout(() => {
                setMissedAnswerText("");
            }, 2000)
        })
    
      }, [socket]);

    const determineCelebration = () => {
        const peopleWhoGotIt = roomData?.gameState?.userIdsWithCorrectAnswerForRound?.length ?? 0;

        if(peopleWhoGotIt >= 1) {
            setCelebration(itemData?.commonItem?.funFact ?? '');
        } else {
            setCelebration(itemData?.commonItem?.congrats ?? '');
        }

        // set time out to clear
        // setTimeout(() => {
        //     setCelebration('');
        // }, 5000)
    }

    const handleSubmitAnswer = () => {
        const correctAnswer = itemData?.commonItem?.languages[chosenLanguage];

        if(enteredAnswer?.toLowerCase() === correctAnswer?.toLowerCase()) {
            console.log("CORRECT");

            handleCorrectAnswer();
            determineCelebration();

            // handle correct answer

        } else {
            console.log("INCORRECT");
            // handle incorrect answer
            
        }

        setEnteredAnswer("");

    }


    useEffect(() => {
        // on round change
        setCelebration('');

        if(roomData?.gameState) {
            setItemData({
                cardOne: roomData?.gameState?.cardOne,
                cardTwo: roomData?.gameState?.cardTwo,
                commonItem: roomData?.gameState?.commonItem,
                allItems: roomData?.gameState?.allItems
            })
        }

    }, [roomData?.gameState?.currentRound])


    const handleSymbolClick = (symbol: string) => {
        setEnteredAnswer(enteredAnswer + symbol);
        // focus back on the input
        document?.getElementById(ANSWER_INPUT_ID)?.focus()
    }

    // TODO: update dynamically
    const cardHeight = 400
    const cardWidth = 400

    return (
        <Box display={'flex'} flexWrap={'wrap'} minHeight={'100vh'}>

            <Box flexGrow={100}>
                <Box className="header noBackgroundText" display='flex' padding={2}>
                    <Button variant="contained" color="primary" onClick={handleLeaveLobby}>Leave Game</Button>
                    <Box>
                        <MainTitle size={'small'} />
                    </Box>
                    <Box>
                        {roomData?.roomCode} - Round {roomData?.gameState?.currentRound} of {roomData?.gameState?.totalRounds}
                    </Box>
                </Box>


                <Box display={'flex'} flexDirection={'column'} alignItems={'center'} height="90%" justifyContent={'center'}>
                    <span className='noBackgroundText'>
                        What do these have in common?
                    </span>

                    <Box className="cardContainer">
                        <Box className="card" width={cardWidth} height={cardHeight}>
                            <GameCard difficulty={2} cardHeight={cardHeight} cardWidth={cardWidth} items={itemData?.cardOne} />
                        </Box>
                        <Box className="card" width={cardWidth} height={cardHeight} position={'relative'}>

                            <GameCard difficulty={2} cardHeight={cardHeight} cardWidth={cardWidth} items={itemData?.cardTwo} />

                        </Box>
                    </Box>

                    <Box>
                        <Box className="flexCenter contentBox" gap={1}>
                            <TextField 
                                id={ANSWER_INPUT_ID} 
                                label="" 
                                variant="outlined" 
                                value={enteredAnswer} 
                                onChange={(v)=>{setEnteredAnswer(v.target?.value)}}
                                slotProps={{
                                    input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <span style={{fontSize: '2rem'}}>
                                                <LanguageFlag language={chosenLanguage} />
                                            </span>
                                        </InputAdornment>
                                    ),
                                    onKeyDown: (event) => {
                                        const enterKeys = ['Enter']
                                        if (enterKeys.includes(event.key) && enteredAnswer?.length) {
                                            handleSubmitAnswer()
                                        }
                                      }
                                    },
                                }}
                                
                            />
                            <Button variant="contained" color="primary" onClick={handleSubmitAnswer} disabled={!enteredAnswer?.length || !!celebration?.length}>Submit</Button>
                        </Box>
                        <Box height={10}>
                            <TimerBar timePerRound={roomData?.gameState?.timePerRound} expiryTime={roomData?.gameState?.roundExpiryTimeUTC} handleTimeOut={()=>{
                                handleTimeOut();
                            }} />
                        </Box>
                        <Box mt={3} className={`${celebration?.length ? 'celebrationText' : missedAnswerText?.length && 'missedAnswerText'}`}>
                            {celebration}{missedAnswerText}
                        </Box>


                        <Box>
                            <SymbolKeyboard language={chosenLanguage} onSymbolClick={handleSymbolClick}/>
                        </Box>
                        
                    </Box>
                </Box>

            </Box>


            <Box paddingTop={2} flexShrink={0} className="rightSideBarContainer" display={'flex'} flexDirection={'column'} justifyContent={'space-between'}>

                <Box className="rightSideBar">
                    {roomData?.users?.sort((a, b)=>{
                        const aScore = a?.score ?? 0;
                        const bScore = b?.score ?? 0;
                        return bScore - aScore
                    })?.map((user, index) => {
                        return (
                            <UserScore user={user} position={index+1}/>
                        )
                    })}
                </Box>

                <Box padding={2}>
                    <Button size='large' variant="contained" color="primary" onClick={() => {setHintMenuOpen(true)}} fullWidth={true}>
                       Reference sheet
                    </Button>
                </Box>

            </Box>

            <HintMenu open={hintMenuOpen} handleClose={() => {setHintMenuOpen(false)}} chosenLanguage={chosenLanguage}/>
        </Box>
    );
}

export default GameOn;