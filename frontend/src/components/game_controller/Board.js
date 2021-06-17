import React, { useState, useEffect } from 'react'
import { BOARD_DIMENSION } from '../assets/constants.js'
import { canSwap, shuffle, swap, updateURL } from '../assets/helpers.js'
import Tile from './Tile';
import './Board.css'

const Board = ({ dimension, imageUrl, callBack }) => {
    
    const [width, setWidth] = useState();
    const [height, setHeight] = useState();
    const [tiles, setTiles] = useState([]);
    const [isStarted, setIsStarted] = useState(false);

    useEffect(() => {
        setWidth(Math.floor(BOARD_DIMENSION / dimension));
        setHeight(Math.floor(BOARD_DIMENSION / dimension));
        setTiles([...Array(dimension * dimension).keys()]);
        return () => {
            // blank
        }
    }, [dimension])

    useEffect(() => {
        updateURL(isStarted, tiles);
        callBack(tiles);
        return () => {
            // blank
        }
    }, [tiles, isStarted, callBack])

    const shuffleTiles = () => {
        const shuffledTiles = shuffle(tiles, dimension);
        setTiles(shuffledTiles);
    }

    const swapTile = (dimension, srcTile) => {
        const destTile = tiles.indexOf(dimension * dimension - 1);
        if (canSwap(dimension, srcTile, destTile)) {
            const swappedTiles = swap(tiles, srcTile, destTile);
            setTiles(swappedTiles);
        }
    }

    const handleTileClick = (dimension, tileIndex) => {
        swapTile(dimension, tileIndex);
    }

    const handleShuffleClick = () => {
        shuffleTiles();
    }

    const handleStartClick = () => {
        shuffleTiles();
        setIsStarted(true);
    }

    return (
        <div>
            <div className='board' style={{ width: `${BOARD_DIMENSION}px`, height: `${BOARD_DIMENSION}px` }} >
                {tiles.map((tile, index) => (
                    <Tile
                        key={tile}
                        index={index}
                        tile={tile}
                        width={width}
                        height={height}
                        dimension={dimension}
                        imageUrl={imageUrl}
                        handleTileClick={handleTileClick}
                    />
                ))}
            </div>
            {isStarted ? <button className='board-button' onClick={handleShuffleClick}>Shuffle</button>
                : <button className='board-button' onClick={handleStartClick}>Start</button>}
        </div>
    )
}

export default Board