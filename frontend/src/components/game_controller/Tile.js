import React, { useState, useEffect } from 'react'
import { Motion, spring } from 'react-motion';
import { BOARD_DIMENSION } from '../assets/constants';
import { getMatrixPosition, getVisualPosition } from '../assets/helpers'
import './Board.css'

const Tile = ({ width, height, tile, index, handleTileClick, dimension, imageUrl }) => {
    
    const [ mul, setMul ] = useState(0);
    useEffect(() => {
        if(parseInt(dimension, 10) === 3) {
            setMul(1.32);
        } else if(parseInt(dimension, 10) === 4) {
            setMul(1.25);
        } else {
            setMul(1.195);
        }
    }, [dimension])

    const { row, col } = getMatrixPosition(dimension, index);
    const visualPos = getVisualPosition(row, col, width, height);
    const tileStyle = {
        width: `${width}px`,
        height: `${height}px`,
        translateX: visualPos.x,
        translateY: visualPos.y,
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: `${BOARD_DIMENSION * mul}px`,
        backgroundPosition: `${(100 / dimension) * (tile % dimension)}% ${(100 / dimension) * (Math.floor(tile / dimension))}%`
    };
    const motionStyle = {
        translateX: spring(visualPos.x),
        translateY: spring(visualPos.y)
    }
    return (
        <Motion style={motionStyle}>
            {({ translateX, translateY }) => (
                <div
                    className='tile'
                    style={{
                        ...tileStyle,
                        transform: `translate3d(${translateX}px, ${translateY}px, 0)`,
                        opacity: tile === dimension*dimension-1 ? 0 : 1
                    }}
                    onClick={() => handleTileClick(dimension, index)}
                >
                    {!imageUrl && `${tile+1}`}
                </div>
            )}
        </Motion>
    )
}

export default Tile
