import React,{useContext, useState, useEffect} from 'react'
import styled from 'styled-components';
import { useSelector } from 'react-redux';


import Billing from './Billing';
import StripeContanier from './StripeContanier';
import { FormContext } from '../../../pages/CheckoutPage'
import LogendIn from './LogendIn';
import Shipping from './Shipping';
import {OrderContext} from "../../../App"
import { useNavigate } from 'react-router-dom';
 
function Steps() {
 
    const navigate = useNavigate()
    const isAuth = window.localStorage.getItem("access_token")
    const user = useSelector(state => state.auth.user)
    const [signInMessage, setsignInMessage] = useState(null)
  
    const { activeStepIndex, setActiveStepIndex } = useContext(FormContext);
    const { formData, setFormData} = useContext(OrderContext);
    
    
    const backButton =() => {
        setActiveStepIndex(activeStepIndex - 1);
      }

    const onSubmit=() => {
  
            setActiveStepIndex(activeStepIndex + 1);
            setFormData({...formData, userId:user.id})
           
          
       
        
      }
    let stepContent;
    switch (activeStepIndex) {
      case 0:
        stepContent = !isAuth ? <div> Checkout as guest. No login required.</div>: <LogendIn/>;
        break;
      case 1:
        
        stepContent = <Billing/>;
        break;
      case 2:
        stepContent = <Shipping/>;
        break;
        case 3:
          stepContent = <StripeContanier/>;
          break;
      default:
        break;
    }
  
    return (
    <Container>
       
        {stepContent}

        {activeStepIndex === 0 &&(
          <button  className='button' onClick={onSubmit}>Next</button>
        )}
        
       
    </Container>
    )
    
  }
  const Container = styled.div`
        
        width:100%;
        display:flex;
        flex-direction:column;
        min-height:500px;
        justify-content:center;
        align-items:center;
        position:sticky;
        top:0;
       
    
      

        
        .button{
          color:#fff;
          background:blue;
          padding:8px 15px;
          border-radius:6px;
          margin-top:10px;
          font-size: 17px;
      
          &:hover{
            opacity:0.8;
          }
        }
        
       
  `

export default Steps