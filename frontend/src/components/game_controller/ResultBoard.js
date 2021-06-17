import React, { Component } from 'react';
import { canSwap, swap } from '../assets/helpers.js';
import { BOARD_DIMENSION } from '../assets/constants.js'
import Tile from './Tile';
import './Board.css';
import './GamePage.css';

class ResultBoard extends Component {

    state = {
        width: Math.floor(BOARD_DIMENSION / this.props.dimension),
        height: Math.floor(BOARD_DIMENSION / this.props.dimension),
        moves: [...this.props.moves],
        tileValues: this.props.tileValues
    }

    garbageFunction = (dimension, tileIndex) => {
        // Do nothing.
    }

    showMove = (move) => {
        let srcTile = -1, dimension = this.props.dimension;
        const destTile = this.state.tileValues.indexOf(dimension * dimension - 1);
        if(move === 'left')
            srcTile = destTile-1;
        else if(move === 'right')
            srcTile = destTile+1;
        else if(move === 'up')
            srcTile = destTile-dimension;
        else if(move === 'down')
            srcTile = destTile+dimension;

        if(srcTile === -1)
            return;
        if (canSwap(dimension, srcTile, destTile)) {
            const swappedTiles = swap(this.state.tileValues, srcTile, destTile);
            this.setState({
                tileValues: swappedTiles
            });
        }
    }

    componentDidMount = () => {
        this.i = setInterval(() => {
            const moves = this.state.moves;
            if(moves.length === 0) {
                clearInterval(this.i);
                return;
            }
            const move = moves.pop();
            this.setState({
                moves
            })
            this.showMove(move);
        }, 1000);
    }

    componentWillUnmount = () => {
        // blank
    }

    render() {
        return (
            <div>
                <div className='board' style={{ width: `${BOARD_DIMENSION}px`, height: `${BOARD_DIMENSION}px` }} >
                    {this.state.tileValues.map((tile, index) => (
                        <Tile
                            key={tile}
                            index={index}
                            tile={tile}
                            width={this.state.width}
                            height={this.state.height}
                            dimension={this.props.dimension}
                            imageUrl={this.props.imageUrl}
                            handleTileClick={this.garbageFunction}
                        />
                    ))}
                </div>
                {(this.state.moves.length > 0)
                    ?<button className='disabled-button' style={{marginTop: '70px'}} disabled >Solving</button>
                    :<button className='board-button' onClick={() => this.props.getBack()} >Got it</button>
                }
            </div>
        )
    }
}

export default ResultBoard
