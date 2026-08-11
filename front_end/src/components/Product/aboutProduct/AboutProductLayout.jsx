import React, { useState } from 'react'
import styled from 'styled-components'
import Description from './Description'
import Specifications from './Specifications'
import ReviewsLayout from './reviews/ReviewsLayout'
import { useTranslation } from 'react-i18next'
import zIndex from '@mui/material/styles/zIndex'



function AboutProductLayout() {
   const [isOpen, setIsOpen] = useState(1)
   const {t, i18n} = useTranslation();
   
  return (
    <Container>
      <div className="buttons-container" style={{position:"sticky", top:"60px", backgroundColor:"#ffff", padding:"20px 0",zIndex:1 }}>
        <button onClick={() => setIsOpen(1)} id={isOpen == 1 ? "selected" : undefined}>
          
          {t("productInfo.CostumerReviews")}
        </button>
        {/*
        <button onClick={() => setIsOpen(2)} id={isOpen == 2 && "selected"}>
         
           {t("productInfo.specifications")}
        </button>
        
        */}

        <button onClick={() => setIsOpen(3)} id={isOpen == 3 ? "selected": undefined}>
          
          {t("productInfo.description")}
        </button>
      </div>
      <div>

        {isOpen == 1 && <ReviewsLayout />}
        {/*{isOpen == 2 && <Specifications />}*/}
        {isOpen == 3 &&<Description />}
      
      </div>
    </Container>
  );
}

export default AboutProductLayout
const Container = styled.div`
   width:90%;
   padding:0 20px;
  #selected {
    border-bottom: 2px solid #fece8b;
    animation-name: border-movement;
    animation-duration: 0.1s;
    
  }
  @keyframes border-movement {
    0% {
      border-width: 0;
      border-color:green;
    }
    25% {
      border-width: 1px;
      border-color:greenyellow;
    }

    
    100% {
      border-width: 2px;
      border-color:orangered;
    }
  }
  .buttons-container {
    margin-bottom: 20px;
    display:flex;
    flex-wrap:nowrap;
    gap:30px;
  }
  .buttons-container button {
    border: none;
    background: none;
    font-family:roboto sant serif;
    font-size: 1.5rem;
    font-weight: 500;
    white-space:nowrap;
    margin-bottom:2px;
    cursor: pointer;
    padding:4px 0;

  }
  .buttons-container button:hover {
     color:gray;
  }
  @media only screen and (max-width: 550px) {

      .buttons-container button {
      font-size: 1.2rem;
     
    }
    &{
      margin:auto;
       width:90%;
    }
  }
  @media only screen and (max-width: 400px) {

.buttons-container button {
font-size: 1rem;

}
}
`;