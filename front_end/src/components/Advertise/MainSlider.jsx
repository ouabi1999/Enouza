import React from "react"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"
import Slider from "react-slick";
import styled from "styled-components";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import { useSelector } from "react-redux";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { v4 as uuidv4 } from 'uuid';
import { Link } from "react-router-dom";
const MainSlider = () => {

  const displayData = useSelector(state => state.display.displayData)
  const handleSelect = (value)=>{
      window.localStorage.setItem("selectedImageSlider", value)
  }
  

  return (
    <Container>


      
        <Swiper

          loop={true}
          modules={[Pagination, Navigation, Autoplay]} 
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}

          pagination={{
          clickable: true,
          }}

          className="mySwiper skeleton"
        >
          
          
          {displayData?.slider?.[0] && (
       
             <SwiperSlide>
                  <img src={displayData?.slider[0]} alt="slider" />
            </SwiperSlide>
              
            )}
             {displayData?.slider?.[1] && (
       
       <SwiperSlide>
            <img src={displayData?.slider[1]} alt="slider" />
      </SwiperSlide>
        
      )}
       {displayData?.slider?.[2] && (
       
       <SwiperSlide>
            <img src={displayData?.slider[2]} alt="slider" />
      </SwiperSlide>
        
      )}
        {displayData?.slider?.[3] && (
       
       <SwiperSlide>
            <img src={displayData?.slider[4]} alt="slider" />
      </SwiperSlide>
        
      )}   
       {displayData?.slider?.[4] && (
       
       <SwiperSlide>
            <img src={displayData?.slider[4]} alt="slider" />
      </SwiperSlide>
        
      )}
           
        </Swiper>
    </Container>
  )
}

export default MainSlider;

const Container = styled.div`
    
   
   min-width:200px;
   min-height:120px;
  
   height:50vh;

  
   
 
  .skeleton {
      
      animation: skeleton-loading 1s linear infinite alternate;
      height:100%;
      
}

@-webkit-keyframes skeleton-loading {
  0% {
    background-color: #c2cfd6;
  }
  100% {
    background-color: #f0f3f5;
  }
}

@keyframes skeleton-loading {
  0% {
    background-color: #c2cfd6;
  }
  100% {
    background-color: #f0f3f5;
  }
}
   

 img{
    object-fit: cover;
    min-width:200px;
    height:100%;
    width:100%;
    
   
}

@media only screen and (max-width:420px){
      &{
        height:100%;
        width:100%;
        min-width:290px;
      }
      



`