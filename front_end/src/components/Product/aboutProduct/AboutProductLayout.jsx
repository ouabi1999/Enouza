import React, { useState } from 'react'
import styled from 'styled-components'
import CustomerReviews from './reviews/CustomerReviews'
import Description from './Description'
import Specifications from './Specifications'
import productData from "../../../../common/data.json"
import { useSelector } from 'react-redux'
import ReviewsLayout from './reviews/ReviewsLayout'



function AboutProductLayout() {
   const [isOpen, setIsOpen] = useState(1)
   
  return (
    <Container>
      <div className="buttons-container">
        <button onClick={() => setIsOpen(1)} id={isOpen == 1 && "selected"}>
          
          Custumer Reviews
        </button>
        <button onClick={() => setIsOpen(2)} id={isOpen == 2 && "selected"}>
         
          Specifications
        </button>

        <button onClick={() => setIsOpen(3)} id={isOpen == 3 && "selected"}>
          
          Description
        </button>
      </div>
      <div>
      {isOpen == 1 && (
        <ReviewsLayout />
        
      )}
      {isOpen == 2 && <Specifications />}
      {isOpen == 3 && <Description />}
      </div>
    </Container>
  );
}

export default AboutProductLayout
const Container = styled.div`
  margin:auto;
  #selected {
    border-bottom: 2px solid green;
    padding-bottom: 2px;
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
    font-size: 1rem;
    font-weight: 550;
    white-space:nowrap;
    margin-bottom:2px;
    cursor: pointer;
  }
  .buttons-container button:hover {
  }
  @media only screen and (max-width: 550px) {

      .buttons-container button {
      font-size: 0.8rem;
     
    }
  }
  @media only screen and (max-width: 400px) {

.buttons-container button {
font-size: 0.7rem;

}
}
`;