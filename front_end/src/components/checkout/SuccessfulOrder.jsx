import { useState, useEffect, useContext } from "react";
import React from 'react'
import { FormContext } from "./CheckoutContainer";
import { OrderContext } from "../../App"
import styled from "styled-components";
import { BrowserRouter, Link,  unstable_HistoryRouter,  useNavigate} from "react-router-dom";
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import HeadeSeo from "../../common/Heade";


function SuccessfulOrder(props) {
  const {formData, setFormData } =  useContext(OrderContext);
  const [order, setOrder] = useState({})
  const navigate = useNavigate()
  const [isBackButtonClicked, setBackbuttonPress] = useState(false)


 /*useEffect( () =>{
  window.history.pushState(null, null, window.location.href);
  window.onpopstate = function () {
      window.history.go(1);
      console.log("history")
  };

 })*/

 
  return (
    <Container>
      <HeadeSeo title = {"Succesful order"}/>
      <div className="close-container">
        <Link to="/">
          <DisabledByDefaultIcon className="close-icon" />
        </Link>

      </div>
      <Wrapper>

      
      </Wrapper>
      <div className="image">
        <img src="./images/thankyou.jpg" alt="" />
      </div>
      
    </Container>
  )
}

export default SuccessfulOrder

const Container = styled.div`
     position:relative;
     width:100%;
     height:100vh;
  
    .image{
     display:flex;
     justify-content:center;
     
    
     
    }
    img{
      max-width:600px;
      width:50%;
      min-width:350px;
      height:auto;
     
      box-shadow: 2px 4px 8px rgb(12, 12, 12 , 0.5);
      border-radius:6px;  
      position:absolute; 
      top:20%;
      
     
    }
    .close-container{
      position:absolute;
      z-index:1;
      
    }
    .close-icon{
      font-size:30px;
      margin:15px 20px;
    }
  .close-icon:hover{
    color:lightblue;
    transition:250ms;
  }

`
const Wrapper = styled.div`
    background-image:url("./images/congratulation.jpg");
    height: 100vh; /* You must set a specified height */
    background-position: center; /* Center the image */
    background-repeat: no-repeat; /* Do not repeat the image */
    background-size: cover;
    opacity:.4
         
`