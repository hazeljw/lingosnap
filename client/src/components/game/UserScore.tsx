import React from "react";
import { User } from '../../../../common/types';
import { Avatar, Box } from "@mui/material";
import './styles.css';
import UserAvatar from "../common/userAvatar";


function UserScore({user, position}: {user: User, position: number}) {
    return (
        <Box display="flex" justifyContent={'space-between'} gap={1} padding={1} >
            <UserAvatar name={user?.name} selectedAvatar={user.avatar} selectedLanguage={user.selectedLanguage} />
            <Box>
                <Box>
                    {user?.name}{user?.isHost ? ':Host' : ''}
                </Box>
                
                Score: {user?.score}
            </Box>
            <Box>
                # {position}
            </Box>   
        </Box>
    );
}

export default UserScore;