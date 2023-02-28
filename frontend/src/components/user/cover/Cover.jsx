import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Cover.css';
import cover1 from '../../../assets/cover.jpg'
import cover2 from '../../../assets/cover1.jpg'


function Cover() {
    const settings = {
        dots: false,
        infinite: true,
        fade: true,
        speed: 700,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000 
      };
      
  
    return (
      <div className=''>
        <Slider {...settings}>
          <div>
            <img src={cover1} alt='Image 1' />
          </div>
          <div>
            <img src={cover2} alt='Image 2' />
          </div>
        </Slider>
      </div>
    );
  }
  
  export default Cover;
  