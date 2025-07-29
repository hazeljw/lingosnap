import React from "react";
import { Box } from "@mui/material";
import './styles.css';
import UserAvatar from "../common/userAvatar";
import { User } from "@lingosnap/shared";
import { CrownSimple } from "@phosphor-icons/react";


function UserScore({user, position}: {user: User, position: number}) {
    return (
        <Box className='userScore' display="flex" justifyContent={'space-between'} gap={1} padding={1} alignItems={'center'} >
            <UserAvatar name={user?.name} selectedAvatar={user.avatar} selectedLanguage={user.selectedLanguage} />

            <Box className='dongle-regular'>
                <Box display={'flex'} alignItems={"flex-start"} gap={0.4}>
                    {user?.name}{user?.isHost ?  <CrownSimple size={20}  color="#f7ba02" weight="fill"/> : ''}
                </Box>
                
                {user?.score} pts
            </Box>


            <Box style={{fontSize: '1.5rem'}}>
                #{position}
            </Box>   
        </Box>
    );
}

export default UserScore;