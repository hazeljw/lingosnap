import React from "react";
import "./styles.css";
import { CharacterRoundResult, ContentMode, ContentRoundResult, Language, RoomData } from "@lingosnap/shared";
import { Box } from "@mui/material";

const getTimeTakenInSeconds = (timeTaken:number|undefined) => {
    const timeTakenInSeconds = timeTaken ? `${Math.round((timeTaken*10) / 1000)/10}s` : 'X';
    return timeTakenInSeconds;
}

const mapCharacterRoundResult = (userId:string) => (roundResult:CharacterRoundResult) => {
    const timeTaken = roundResult.userToResult.find(user => user.userId === userId)?.timeTaken;
    return (
        <tr key={roundResult.round}>
            <td>{roundResult.round}</td>
            <td>{roundResult.answer.character}</td>
            <td>{roundResult.answer.sound}</td>
            <td className={timeTaken ? 'good' : 'bad'}>{getTimeTakenInSeconds(timeTaken)}</td>
        </tr>
    )
}

const mapContentRoundResult = (chosenLanguage:Language, userId:string) => (roundResult:ContentRoundResult) => { 
    const timeTaken = roundResult.userToResult.find(user => user.userId === userId)?.timeTaken;
    return (
        <tr key={roundResult.round}>
            <td>{roundResult.round}</td>
            <td>{roundResult.answer.symbol}</td>
            <td>{roundResult.answer.languages[chosenLanguage]}</td>
            <td className={timeTaken ? 'good' : 'bad'}>{getTimeTakenInSeconds(timeTaken)}</td>
        </tr>
    )
}



function GameSummary({roomData, userId}:{roomData:RoomData, userId?:string}) {
    if(!userId) return null;
    
const isCharacterMode = roomData.gameState &&[ContentMode.Hiragana, ContentMode.Katakana].includes(roomData.gameState.contentMode);

const chosenLanguage = roomData.users.find(user => user.id === userId)?.selectedLanguage;

console.log(roomData.roundResults);
roomData.roundResults.forEach(roundResult => {
    console.log(roundResult.userToResult);
});

  return (
    <Box className="gameSummary">
        <table>
            <tr>
                <th>Round</th>
                <th>Symbol</th>
                <th>Answer</th>
                <th>Result</th>
            </tr>
            {/* TODO: add rows for each round */}
            {isCharacterMode ? 
                (roomData.roundResults as CharacterRoundResult[]).map(mapCharacterRoundResult(userId))
                :
                (roomData.roundResults as ContentRoundResult[]).map(mapContentRoundResult(chosenLanguage ?? Language.English, userId))
            }
        </table>
    </Box>
  );
}

export default GameSummary;