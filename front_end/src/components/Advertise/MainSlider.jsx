import React from "react"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"
import Slider from "react-slick";
import styled from "styled-components";

import { useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
const MainSlider = () => {

  const displayData = useSelector(state => state.display.displayData)
  
  const handleSelect = (value)=>{
      window.localStorage.setItem("selectedImageSlider", value)
  }
   const {t} = useTranslation()

  return (
    <Container style={{ position: "relative", width: "100%" }}>
  <video
    autoPlay
    muted
    loop
    playsInline
    
  >
    <source
      src="https://res.cloudinary.com/dzpzy1o1y/video/upload/v1786302680/Blossholm_Danish_home_decor_design_Free_shipping_to_Europe_3_itjarw.mp4"
      type="video/mp4"
    />
    Your browser does not support the video tag.
  </video>

  <div
    style={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      zIndex: 10,
      color: "#fff",
      textAlign: "center",
      width: "90%",
      fontFamily: '"Playfair Display", serif'
    }}
  >
    <h1>
      {t("mainSlider.title")}
    </h1>
    
    <span>
      {t("mainSlider.description")}
    </span>

    
  </div>
</Container>
  )}

export default MainSlider;

const Container = styled.div`
    
   
   min-width:200px;

     video {
        width: 100%;
        height: 550px;
        object-fit: cover;
        display: block;
}

 
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
    width:100%;
    display:flex;

    
   
}

@media only screen and (max-width:850px){
      &{
        width:100%;
        min-width:315px;
        object-fit: cover;
      }
       


}
@media only screen and (max-width:420px){
      &{
        width:100%;
        min-width:290px;
        object-fit: cover;
      }
        
      



`