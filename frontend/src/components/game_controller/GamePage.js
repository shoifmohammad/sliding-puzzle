import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Board from './Board';
import ResultBoard from './ResultBoard';
import './GamePage.css';
import { BACKEND_ENDPOINT } from '../assets/constants';
import { RadioGroup, FormControl, FormLabel, FormControlLabel, Divider } from '@material-ui/core';
import RadioButton from '../RadioButton';

const GamePage = ({ dimension, imageUrl }) => {

    const [ heading, setHeading ] = useState('Sliding Puzzle');
    const [ algorithm, setAlgorithm ] = useState('ast');
    const [ tileValues, setTileValues ] = useState([]);
    const [ solving, setSolving ] = useState(false);
    const [ moves, setMoves ] = useState([]);

    const handleHeading = (text) => {
        setHeading(text);
    }

    useEffect(() => {
        const array = window.location.href.split("?");
        if(array.length === 1) {
            handleHeading('Sliding Puzzle');
        } else {
            handleHeading('🌺 Congratulations 🌺');
        }
    }, )

    const handleAlgorithm = (event) => {
        setAlgorithm(event.target.value);
    }
    
    const handleSolve = () => {
        setSolving(true);
        axios.post(BACKEND_ENDPOINT, {tileValues, dimension, algorithm})
            .then((res) => {
                const li = res.data;
                if(li.length === 0) {
                    setSolving(false);
                } else {
                    li.push('garbage');
                }
                li.reverse();
                setMoves(li);
            })
    }    

    const updateTileValues = (tiles) => {
        setTileValues(tiles);
    }

    const setNotSolving = () => {
        setMoves([]);
        setSolving(false);
    }

    return (
        <div>
            <h1 className='heading'>{heading}</h1>
            <div className='gamepage'>
                <div className='board-component'>
                    {(solving && moves.length > 0)?
                        <ResultBoard moves={moves} getBack={setNotSolving} tileValues={tileValues} dimension={dimension} imageUrl={imageUrl} />
                        :<Board dimension={dimension} imageUrl={imageUrl} callBack={updateTileValues} />
                    }
                </div>
                <Divider orientation='vertical' flexItem style={{ backgroundColor: 'blue', marginTop: '30px' }} />
                <div className='solver-component'>
                    <FormControl component="fieldset" >
                        <FormLabel component="legend" style={{ fontSize: '40px', fontWeight: 'bold', color: 'darkcyan', paddingBottom: '40px' }}>Algorithm</FormLabel>
                        <RadioGroup style={{ paddingLeft: '50px' }} defaultValue="ast" aria-label="algorithm-type" name="customized-radios" onChange={handleAlgorithm}>
                            <FormControlLabel value="ast" control={<RadioButton />} label="A-Star Search" />
                            <FormControlLabel value="bfs" control={<RadioButton />} label="Breadth First Search" />
                            <FormControlLabel value="ida" control={<RadioButton />} label="Iterative Deepening A-Star" />
                        </RadioGroup>
                    </FormControl>
                    {solving?
                        <button className='disabled-button' style={{marginTop: '265px'}} disabled >Solve</button>
                        :dimension === 3?
                        <button className='solve-button' onClick={handleSolve} >Solve</button>
                        :<button className='disabled-button' style={{marginTop: '265px'}} disabled >Solve</button>
                    }
                </div>
            </div>
        </div>
    )
}

export default GamePage
