import React from "react";
import { Box } from "@mui/material";
import './styles.css';
import UserAvatar from "../common/userAvatar";
import { User } from "../common/types";


function UserScore({user, position}: {user: User, position: number}) {
    return (
        <Box className='userScore' display="flex" justifyContent={'space-between'} gap={1} padding={1} alignItems={'center'} >
            <UserAvatar name={user?.name} selectedAvatar={user.avatar} selectedLanguage={user.selectedLanguage} />

            <Box className='dongle-regular'>
                <Box>
                    {user?.name}{user?.isHost ? ':Host' : ''}
                </Box>
                
                Score: {user?.score}
            </Box>


            <Box style={{fontSize: '1.5rem'}}>
                #{position}
            </Box>   
        </Box>
    );
}

export default UserScore;