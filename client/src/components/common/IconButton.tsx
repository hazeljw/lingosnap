import { Box } from "@mui/material"
import { ReactNode } from "react"

export const ICON_BUTTON_SIZE = '45px'

const IconButton = ({text, icon}:{text?:string, icon:ReactNode}) => {

    return (
        <Box color={'white'}>
            {icon}
            <div style={{fontSize: '0.8rem', lineHeight: '0.8rem'}}>{text?.toUpperCase()}</div>
        </Box>
    )
}

export default IconButton