import { Box } from "@mui/material"
import { User } from "../common/types"
import UserScore from "./UserScore"

const ScoreBoard = ({users}:{users?:User[], isMobileView?:boolean}) => {

    const sortedUsers = users?.sort((a, b)=>{
        const aScore = a?.score ?? 0;
        const bScore = b?.score ?? 0;
        return bScore - aScore
    })

    return (
        <Box className="rightSideBar">

            {sortedUsers?.map((user, index) => {
                return (
                    <UserScore user={user} position={index+1}/>
                )
            })}
            
        </Box>
    )
}

export default ScoreBoard