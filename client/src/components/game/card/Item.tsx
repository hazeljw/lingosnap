import { Box } from "@mui/material"
import { ReactNode } from "react"
import { CharacterItem, ContentItem } from '../../common/types';
import './styles.css';

interface ItemMotion {
    xSpeed: number;
    ySpeed: number;
    zSpeed: number;
}

export interface GameCardItem {
    item: ContentItem | CharacterItem
    icon: ReactNode;
    motion: ItemMotion;
    size: string;
}

interface ItemProps {
    item: GameCardItem;
    containerWidth: string;
    containerHeight: string;
}

const Item = ({item, containerWidth, containerHeight}:ItemProps) => {

    const {xSpeed, ySpeed, zSpeed} = item.motion

    return (
        <div>
            <style>
                {`
                    @keyframes x {
                       100% {
                            transform: translateX(calc(${containerWidth} - ${item.size}));
                        }
                    }
                    @keyframes y {
                        100% {
                            transform: translateY(calc(${containerHeight} - ${item.size}));
                        }
                    }
                `}
            </style>
            <div className="el-wrap" style={{animation: `x ${xSpeed}s linear infinite alternate`}}>
                <div style={{animation: `y ${ySpeed}s linear infinite alternate`}}>
                    <Box className="el" style={{animation: `z ${zSpeed}s linear infinite`}} height={item.size} width={item.size}>
                        {item.icon}
                    </Box>
                </div>
            </div>
        </div>

    )
}

export default Item