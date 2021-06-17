import React, { useState } from 'react'
import './App.css';
import Modal from 'react-modal';
import { RadioGroup, FormControl, FormLabel, FormControlLabel, Divider } from '@material-ui/core';
import RadioButton from './components/RadioButton.js';
import Slider from './components/slider/Slider';
import './Styles/Modals.css'
import GamePage from './components/game_controller/GamePage';

Modal.setAppElement('#root');

const App = () => {

  const [imageUrl, setImageUrl] = useState('');
  const [welcomeModalOpen, setWelcomeModalOpen] = useState(true);
  const [sliderModalOpen, setSliderModalOpen] = useState(false);
  const [background, setBackground] = useState('number');
  const [dimension, setDimension] = useState(3);

  const handleImageChoose = (imageUrl) => {
    setImageUrl(imageUrl);
    setWelcomeModalOpen(false);
    setSliderModalOpen(false);
    setBackground('image');
  }

  const hideSlider = () => {
    setImageUrl('');
    setWelcomeModalOpen(true);
    setSliderModalOpen(false);
  }

  const handleDimension = (event) => {
    setDimension(event.target.value);
  }

  const handleBackground = (event) => {
    if (event.target.value === 'image') {
      setWelcomeModalOpen(false);
      setSliderModalOpen(true);
    } else {
      setBackground(event.target.value);
    }
  }

  return (
    <div className="App">
      <Modal
        isOpen={sliderModalOpen}
        style={{
          overlay: {
            backgroundColor: 'grey'
          }
        }}
      >
        <Slider handleImageChoose={handleImageChoose} hideSlider={hideSlider} />
      </Modal>
      <Modal
        isOpen={welcomeModalOpen}
        style={{
          overlay: {
            backgroundColor: 'grey'
          },
          content: {
            color: 'orange'
          }
        }}
      >
        <div className='welcome-modal'>
          <h1>Welcome to the Game</h1>
          <div className='welcome-modal-body'>
            <div className='game-parameters'>
              <h2>Game Parameters</h2>
              <div style={{ fontSize: '25px', display: 'flex', flexDirection: 'row', marginTop: '30px' }}>
                <label>Dimension : </label>
                <select style={{fontSize: '25px', width: '70px', paddingLeft: '20px', marginLeft: '30px'}} value={dimension} onChange={handleDimension} >
                  <option key={1} value={3}>3</option>
                  <option key={2} value={4}>4</option>
                  <option key={3} value={5}>5</option>
                </select>
              </div>
              <FormControl component="fieldset">
                <FormLabel component="legend" style={{ fontSize: '25px', paddingTop: '30px', paddingRight: '130px', color: 'lightcoral' }}>Background</FormLabel>
                <RadioGroup style={{paddingLeft: '30px', paddingTop: '10px' }} defaultValue="number" aria-label="background-type" name="customized-radios" onChange={handleBackground}>
                  <FormControlLabel value="number" control={<RadioButton />} label="Number" />
                  <FormControlLabel value="image" control={<RadioButton />} label="Image" />
                </RadioGroup>
              </FormControl>
            </div>
            <Divider orientation='vertical' flexItem style={{ backgroundColor: 'lightcoral', marginTop: '30px' }} />
            <div className='game-instructions'>
              <h2 style={{marginBottom: '50px'}}>Game instructions</h2>
              We will have few tiles and an empty cell. We have to move the tiles that are adjacent to the empty cell.
              To move a tile we have to click on that tile. Our target is to set the shuffled tiles in an order. 
              For example, in case of 3, we'll have 8 tiles(i.e. 3*3-1). We have to set them in order of [1,2,3,4,5,6,7,8], 
              similarly for 4 as well. Enjoy the game !
            </div>
          </div>
          <button className='start-button' onClick={() => { setSliderModalOpen(false); setWelcomeModalOpen(false); }} >Start</button>
        </div>
      </Modal>
      <GamePage dimension={dimension} imageUrl={imageUrl} background={background} />
    </div>
  );
}

export default App;
