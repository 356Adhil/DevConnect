import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Cover.css';
import cover1 from '../../../assets/cover.jpg'
import cover2 from '../../../assets/cover2.jpg'

function Cover() {
    const settings = {
        dots: false,
        infinite: true,
        fade: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        cssEase: 'linear',
        arrows:false
    };
  
    return (
        <div className=''>
            <Slider {...settings}>
                <div >
                    <img src={cover1} alt=''/>
                    <h1 className='absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold text-white xl:text-3xl md:text-2xl text-center'>"Innovation Starts Here: Join the Premier Developer Community and Unlock Your Potential"</h1>
                </div>
                <div>
                    <img src={cover2} alt='' />
                    <h1 className='absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white xl:text-3xl md:text-2xl font-bold text-center'>"Innovation Starts Here: Join the Premier Developer Community and Unlock Your Potential"</h1>
                </div>
            </Slider>
        </div>
    );
}

export default Cover;
