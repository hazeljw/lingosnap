import React from "react";
import { User } from '../../../../common/types';
import { Avatar, Box } from "@mui/material";
import './styles.css';


function UserScore({user, position}: {user: User, position: number}) {
    return (
        <Box display="flex" justifyContent={'space-between'} gap={1} padding={1} >
            <Avatar alt={user?.name?.length ? user?.name : "LingoSnap"} src="/static/images/avatar/1.jpg" />
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