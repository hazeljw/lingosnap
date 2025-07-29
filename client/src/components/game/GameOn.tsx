import React, { useEffect } from 'react';
import './styles.css';
import { Box, Button, InputAdornment, TextField } from '@mui/material';
import { CharacterGameContentData, GameContentData } from './helpers';
import HintMenu from './HintMenu';
import { ContentMode, Language, CharacterGameState, CharacterItem, ContentItem, GameState, RoomData } from '@lingosnap/shared';
import TimerBar from './TimerBar';
import { Socket } from 'socket.io-client';
import MainTitle from '../common/MainTitle';
import SymbolKeyboard from './LanguageSymbolKeyboard';
import GameCard from './card/GameCard';
import LanguageFlag from '../common/LanguageFlag';
import { mapContentModeToGameItemSize } from '../common/mappers';
import { Notepad } from '@phosphor-icons/react';
import IconButton, { ICON_BUTTON_SIZE } from '../common/IconButton';
import ScoreBoard from './ScoreBoard';

const ANSWER_INPUT_ID = 'answer-input-id'

interface GameOnProps {
    roomData?: RoomData;
    handleLeaveLobby: () => void;
    handleCorrectAnswer: () => void;
    handleTimeOut: () => void;
    socket: Socket;
}

function GameOn({roomData, handleLeaveLobby, handleCorrectAnswer, handleTimeOut, socket}: GameOnProps) {
    const [itemData, setItemData] = React.useState<GameContentData | CharacterGameContentData>();
    const [hintMenuOpen, setHintMenuOpen] = React.useState<boolean>(false);

    const [celebration, setCelebration] = React.useState<string>('');
    const [missedAnswerText, setMissedAnswerText] = React.useState<string>("");

    const [enteredAnswer, setEnteredAnswer] = React.useState<string>("");

    const isCharacterMode = roomData?.gameState?.contentMode && [ContentMode.Hiragana, ContentMode.Katakana].includes(roomData?.gameState?.contentMode)
    const chosenLanguage = isCharacterMode ? Language.Japanese : roomData?.users?.find((user) => user.id === socket.id)?.selectedLanguage ?? Language.Spanish;

    useEffect(() => {
    
        socket.on('out_of_time', (data) => {
            let textToDisplay = ''
            
            const roomData:RoomData = data?.roomData

            if(isCharacterMode){
                const gameState = roomData?.gameState as CharacterGameState

                textToDisplay = `Answer was ${gameState?.commonItem?.character}, ${gameState?.commonItem?.sound}`

            } else {
                const gameState = roomData?.gameState as GameState
                const languageData = gameState?.commonItem?.languages ? gameState?.commonItem?.languages[chosenLanguage] : '';
                
                let answerText = '';
                if (Array.isArray(languageData)) {
                    answerText = languageData[0] || ''; // Show only the first option
                } else {
                    answerText = languageData || '';
                }

                textToDisplay = `Answer was ${answerText}! ` + gameState?.commonItem?.sorry
            }

            setMissedAnswerText(textToDisplay);

            // set time out to clear
            setTimeout(() => {
                setMissedAnswerText("");
            }, 2000)
        })
    
      }, [socket]);

    const determineCelebration = () => {
        if(isCharacterMode) {
            setCelebration('Well done!!');
            return
        }

        const peopleWhoGotIt = roomData?.gameState?.userIdsWithCorrectAnswerForRound?.length ?? 0;

        const commonItem = itemData?.commonItem as ContentItem

        if(peopleWhoGotIt >= 1) {
            setCelebration(commonItem?.funFact ?? '');
        } else {
            setCelebration(commonItem?.congrats ?? '');
        }

        // set time out to clear
        // setTimeout(() => {
        //     setCelebration('');
        // }, 5000)
    }

    const determineCorrectAnswer = () => {
        if(isCharacterMode) {
            const commonItem = itemData?.commonItem as CharacterItem
            return commonItem?.sound;
        } else {
            const commonItem = itemData?.commonItem as ContentItem
            const languageData = commonItem?.languages ? commonItem?.languages[chosenLanguage] : '';
            
            // Return array of possible answers, or single answer wrapped in array
            if (Array.isArray(languageData)) {
                return languageData;
            } else {
                return languageData ? [languageData] : [];
            }
        }
    }

    const handleSubmitAnswer = () => {
        const correctAnswers = determineCorrectAnswer();

        // For character mode, still handle single answer
        if(isCharacterMode) {
            if(enteredAnswer?.toLowerCase() === (correctAnswers as string)?.toLowerCase()) {
                handleCorrectAnswer();
                determineCelebration();
            }
        } else {
            // Check if entered answer matches any of the correct answers
            const isCorrect = (correctAnswers as string[]).some(answer => 
                enteredAnswer?.toLowerCase() === answer?.toLowerCase()
            );
            
            if(isCorrect) {
                handleCorrectAnswer();
                determineCelebration();
            } else {
                // TODO: give some ui feedback for incorrect answer
            }
        }

        setEnteredAnswer("");
    }


    useEffect(() => {
        // on round change
        setCelebration('');

        if(roomData?.gameState) {
            setItemData({
                cardOne: roomData?.gameState?.cardOne as ContentItem[],
                cardTwo: roomData?.gameState?.cardTwo as ContentItem[],
                commonItem: roomData?.gameState?.commonItem as ContentItem,
                allItems: roomData?.gameState?.allItems as ContentItem[]
            })
        }

    }, [roomData?.gameState?.currentRound])


    const handleSymbolClick = (symbol: string) => {
        setEnteredAnswer(enteredAnswer + symbol);
        // focus back on the input
        document?.getElementById(ANSWER_INPUT_ID)?.focus()
    }

    const baseDimension = 400

    // TODO: update dynamically
    const cardWidth = Math.min(baseDimension, window.innerWidth-40);
    const cardHeight = window.innerWidth - cardWidth < cardWidth ? Math.max(200, (window.innerHeight-400)/2) : baseDimension
 
    return (
        <Box display={'flex'} flexWrap={'wrap'} minHeight={'100vh'}>

            <Box flexGrow={100}>
                <Box className="header noBackgroundText" display='flex' padding={2}>
                    <Button size={'small'} variant="contained" color="primary" onClick={handleLeaveLobby}>Leave</Button>
                    <Box>
                        <MainTitle size={'small'} />
                    </Box>
                    <Box>
                        {roomData?.roomCode} - Round {roomData?.gameState?.currentRound} of {roomData?.gameState?.totalRounds}
                    </Box>

                    <Box className='mobileRefBtn'>
                        <Button size='small' variant="contained" color="primary" onClick={() => {setHintMenuOpen(true)}} fullWidth={false}>
                            <Notepad size={ICON_BUTTON_SIZE}  weight="thin"/>
                        </Button>

                    </Box>
                </Box>


                <Box display={'flex'} flexDirection={'column'} alignItems={'center'} height="90%" justifyContent={'center'} maxWidth={'100vw'}>
                    <span className='noBackgroundText' style={{fontSize: '1.5rem'}}>
                        What do these have in common?
                    </span>

                    <Box className="cardContainer">
                        <Box className="card" width={cardWidth} height={cardHeight}>
                            <GameCard 
                                difficulty={2} 
                                cardHeight={cardHeight} 
                                cardWidth={cardWidth} 
                                items={itemData?.cardOne} 
                                size={mapContentModeToGameItemSize(roomData?.gameState?.contentMode)}
                                isCharacterMode={isCharacterMode}
                                disableRotation={isCharacterMode}
                            />
                        </Box>
                        <Box className="card" width={cardWidth} height={cardHeight} position={'relative'}>
                            <GameCard 
                                difficulty={2} 
                                cardHeight={cardHeight} 
                                cardWidth={cardWidth} 
                                items={itemData?.cardTwo}
                                size={mapContentModeToGameItemSize(roomData?.gameState?.contentMode)}
                                isCharacterMode={isCharacterMode}
                                disableRotation={isCharacterMode}
                            />
                        </Box>
                    </Box>

                    <Box maxWidth={'100vw'}>
                        <Box mb={1}>
                            <SymbolKeyboard 
                                language={chosenLanguage}
                                onSymbolClick={handleSymbolClick}
                            />
                        </Box>
                        <Box className="flexCenter contentBox answerInput" gap={1}>
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
                    </Box>
                </Box>

            </Box>


            <Box paddingTop={2} className="rightSideBarContainer">

                <ScoreBoard users={roomData?.users} />

                <Box padding={2}>
                    <Button size='large' variant="contained" color="primary" onClick={() => {setHintMenuOpen(true)}} fullWidth={true}>
                        <IconButton text='Reference Sheet' icon={<Notepad size={ICON_BUTTON_SIZE}  weight="thin"/>} />
                    </Button>
                </Box>

            </Box>

            <HintMenu 
                open={hintMenuOpen} 
                handleClose={() => {setHintMenuOpen(false)}} 
                chosenLanguage={chosenLanguage} 
                contentMode={roomData?.gameState?.contentMode}
                allItems={itemData?.allItems}
            />
        </Box>
    );
}

export default GameOn;