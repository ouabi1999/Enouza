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
          {" "}
          Custumer Reviews{" "}
        </button>
        <button onClick={() => setIsOpen(2)} id={isOpen == 2 && "selected"}>
          {" "}
          Specifications{" "}
        </button>

        <button onClick={() => setIsOpen(3)} id={isOpen == 3 && "selected"}>
          {" "}
          Description{" "}
        </button>
      </div>
      {isOpen == 1 && (
        <ReviewsLayout />
        
      )}
      {isOpen == 2 && <Specifications />}
      {isOpen == 3 && <Description />}
    </Container>
  );
}

export default AboutProductLayout
const Container = styled.div`
  
  #selected {
    border-bottom: 4px solid green;
    padding-bottom: 4px;
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

    50% {
      border-width: 2px;
      border-color:blueviolet;
    }
    75% {
      border-width: 3px;
      border-color:yellowgreen;
    }
    100% {
      border-width: 4px;
      border-color:orangered;
    }
  }
  .buttons-container {
    margin-bottom: 20px;
  }
  .buttons-container button {
    border: none;
    background: none;
    font-size: 1rem;
    font-weight: 550;
    margin-right: 50px;
    cursor: pointer;
  }
  .buttons-container button:hover {
  }
`;