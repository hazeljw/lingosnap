import { Box } from "@mui/material"
import { ReactNode } from "react"
import { CharacterItem, ContentItem } from '@lingosnap/shared';
import './styles.css';

interface ItemMotion {
    xSpeed: number;
    ySpeed: number;
    zSpeed: number;
    clockwise?: boolean;
}

export interface GameCardItem {
    item: ContentItem | CharacterItem
    icon: ReactNode;
    motion: ItemMotion;
    height: string;
    width: string;
    size: string;
}

interface ItemProps {
    item: GameCardItem;
    containerWidth: string;
    containerHeight: string;
}

const Item = ({item, containerWidth, containerHeight}:ItemProps) => {

    const {xSpeed, ySpeed, zSpeed, clockwise} = item.motion

    const animationKey = `size-${item.size}`

    return (
        <div>
            <style>
                {`
                    @keyframes ${animationKey}-x {
                       100% {
                            transform: translateX(calc(${containerWidth} - ${item.size}));
                        }
                    }
                    @keyframes ${animationKey}-y {
                        100% {
                            transform: translateY(calc(${containerHeight} - ${item.size}));
                        }
                    }
                `}
            </style>
            <div className="el-wrap" style={{animation: `${animationKey}-x ${xSpeed}s linear infinite alternate`}}>
                <div style={{animation: `${animationKey}-y ${ySpeed}s linear infinite alternate`}}>
                    <Box className="el" style={{animation: `z ${zSpeed}s linear infinite ${clockwise ? '' : 'reverse'}`}} height={item.size} width={item.size}>
                        {item.icon}
                    </Box>
                </div>
            </div>
        </div>

    )
}

export default Item