import React, { useState } from 'react'
import { SliderData } from './SliderData'
import { FaArrowAltCircleRight, FaArrowAltCircleLeft, FaTimesCircle } from 'react-icons/fa'
import './Slider.css'

const Slider = ({ handleImageChoose, hideSlider }) => {

    const [ current, setCurrent ] = useState(0)
    const length = SliderData.length;

    const prevSlide = () => {
        setCurrent((current+length-1)%length);
    }

    const nextSlide = () => {
        setCurrent((current+1)%length);
    }

    if(!Array.isArray(SliderData) || SliderData.length <= 0) {
        return null;
    }

    return (
        <section className='slider'>
            <FaArrowAltCircleLeft className='left-arrow' onClick={prevSlide} />
            <FaArrowAltCircleRight className='right-arrow' onClick={nextSlide} />
            <FaTimesCircle className='cross' onClick={() => hideSlider()} />
            {SliderData.map((slide, index) => {
                return (
                    <div className={index === current ? 'slide active' : 'slide'} key={index} >
                        {index === current && (
                            <img src={slide.image} alt="puzzle" className="image" />
                        )}
                    </div>
                    
                )
            })}
            <button className='slider-button' onClick={() => handleImageChoose(SliderData[current].image)} >Start</button>
        </section>
    )
}

export default Slider
